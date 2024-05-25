import {
  Component,
  ErrorFactory,
  FirebaseError,
  LogLevel,
  Logger,
  _getProvider,
  _registerComponent,
  areCookiesEnabled,
  deepEqual,
  getApp,
  getModularInstance,
  isIndexedDBAvailable,
  openDB,
  registerVersion,
  validateIndexedDBOpenable
} from "./chunk-LECWXJ2H.js";

// node_modules/@firebase/installations/dist/esm/index.esm2017.js
var name = "@firebase/installations";
var version = "0.6.7";
var PENDING_TIMEOUT_MS = 1e4;
var PACKAGE_VERSION = `w:${version}`;
var INTERNAL_AUTH_VERSION = "FIS_v2";
var INSTALLATIONS_API_URL = "https://firebaseinstallations.googleapis.com/v1";
var TOKEN_EXPIRATION_BUFFER = 60 * 60 * 1e3;
var SERVICE = "installations";
var SERVICE_NAME = "Installations";
var ERROR_DESCRIPTION_MAP = {
  [
    "missing-app-config-values"
    /* ErrorCode.MISSING_APP_CONFIG_VALUES */
  ]: 'Missing App configuration value: "{$valueName}"',
  [
    "not-registered"
    /* ErrorCode.NOT_REGISTERED */
  ]: "Firebase Installation is not registered.",
  [
    "installation-not-found"
    /* ErrorCode.INSTALLATION_NOT_FOUND */
  ]: "Firebase Installation not found.",
  [
    "request-failed"
    /* ErrorCode.REQUEST_FAILED */
  ]: '{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',
  [
    "app-offline"
    /* ErrorCode.APP_OFFLINE */
  ]: "Could not process request. Application offline.",
  [
    "delete-pending-registration"
    /* ErrorCode.DELETE_PENDING_REGISTRATION */
  ]: "Can't delete installation while there is a pending registration request."
};
var ERROR_FACTORY = new ErrorFactory(SERVICE, SERVICE_NAME, ERROR_DESCRIPTION_MAP);
function isServerError(error) {
  return error instanceof FirebaseError && error.code.includes(
    "request-failed"
    /* ErrorCode.REQUEST_FAILED */
  );
}
function getInstallationsEndpoint({ projectId }) {
  return `${INSTALLATIONS_API_URL}/projects/${projectId}/installations`;
}
function extractAuthTokenInfoFromResponse(response) {
  return {
    token: response.token,
    requestStatus: 2,
    expiresIn: getExpiresInFromResponseExpiresIn(response.expiresIn),
    creationTime: Date.now()
  };
}
async function getErrorFromResponse(requestName, response) {
  const responseJson = await response.json();
  const errorData = responseJson.error;
  return ERROR_FACTORY.create("request-failed", {
    requestName,
    serverCode: errorData.code,
    serverMessage: errorData.message,
    serverStatus: errorData.status
  });
}
function getHeaders({ apiKey }) {
  return new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
    "x-goog-api-key": apiKey
  });
}
function getHeadersWithAuth(appConfig, { refreshToken }) {
  const headers = getHeaders(appConfig);
  headers.append("Authorization", getAuthorizationHeader(refreshToken));
  return headers;
}
async function retryIfServerError(fn) {
  const result = await fn();
  if (result.status >= 500 && result.status < 600) {
    return fn();
  }
  return result;
}
function getExpiresInFromResponseExpiresIn(responseExpiresIn) {
  return Number(responseExpiresIn.replace("s", "000"));
}
function getAuthorizationHeader(refreshToken) {
  return `${INTERNAL_AUTH_VERSION} ${refreshToken}`;
}
async function createInstallationRequest({ appConfig, heartbeatServiceProvider }, { fid }) {
  const endpoint = getInstallationsEndpoint(appConfig);
  const headers = getHeaders(appConfig);
  const heartbeatService = heartbeatServiceProvider.getImmediate({
    optional: true
  });
  if (heartbeatService) {
    const heartbeatsHeader = await heartbeatService.getHeartbeatsHeader();
    if (heartbeatsHeader) {
      headers.append("x-firebase-client", heartbeatsHeader);
    }
  }
  const body = {
    fid,
    authVersion: INTERNAL_AUTH_VERSION,
    appId: appConfig.appId,
    sdkVersion: PACKAGE_VERSION
  };
  const request = {
    method: "POST",
    headers,
    body: JSON.stringify(body)
  };
  const response = await retryIfServerError(() => fetch(endpoint, request));
  if (response.ok) {
    const responseValue = await response.json();
    const registeredInstallationEntry = {
      fid: responseValue.fid || fid,
      registrationStatus: 2,
      refreshToken: responseValue.refreshToken,
      authToken: extractAuthTokenInfoFromResponse(responseValue.authToken)
    };
    return registeredInstallationEntry;
  } else {
    throw await getErrorFromResponse("Create Installation", response);
  }
}
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
function bufferToBase64UrlSafe(array) {
  const b64 = btoa(String.fromCharCode(...array));
  return b64.replace(/\+/g, "-").replace(/\//g, "_");
}
var VALID_FID_PATTERN = /^[cdef][\w-]{21}$/;
var INVALID_FID = "";
function generateFid() {
  try {
    const fidByteArray = new Uint8Array(17);
    const crypto = self.crypto || self.msCrypto;
    crypto.getRandomValues(fidByteArray);
    fidByteArray[0] = 112 + fidByteArray[0] % 16;
    const fid = encode(fidByteArray);
    return VALID_FID_PATTERN.test(fid) ? fid : INVALID_FID;
  } catch (_a) {
    return INVALID_FID;
  }
}
function encode(fidByteArray) {
  const b64String = bufferToBase64UrlSafe(fidByteArray);
  return b64String.substr(0, 22);
}
function getKey(appConfig) {
  return `${appConfig.appName}!${appConfig.appId}`;
}
var fidChangeCallbacks = /* @__PURE__ */ new Map();
function fidChanged(appConfig, fid) {
  const key = getKey(appConfig);
  callFidChangeCallbacks(key, fid);
  broadcastFidChange(key, fid);
}
function callFidChangeCallbacks(key, fid) {
  const callbacks = fidChangeCallbacks.get(key);
  if (!callbacks) {
    return;
  }
  for (const callback of callbacks) {
    callback(fid);
  }
}
function broadcastFidChange(key, fid) {
  const channel = getBroadcastChannel();
  if (channel) {
    channel.postMessage({ key, fid });
  }
  closeBroadcastChannel();
}
var broadcastChannel = null;
function getBroadcastChannel() {
  if (!broadcastChannel && "BroadcastChannel" in self) {
    broadcastChannel = new BroadcastChannel("[Firebase] FID Change");
    broadcastChannel.onmessage = (e) => {
      callFidChangeCallbacks(e.data.key, e.data.fid);
    };
  }
  return broadcastChannel;
}
function closeBroadcastChannel() {
  if (fidChangeCallbacks.size === 0 && broadcastChannel) {
    broadcastChannel.close();
    broadcastChannel = null;
  }
}
var DATABASE_NAME = "firebase-installations-database";
var DATABASE_VERSION = 1;
var OBJECT_STORE_NAME = "firebase-installations-store";
var dbPromise = null;
function getDbPromise() {
  if (!dbPromise) {
    dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
      upgrade: (db, oldVersion) => {
        switch (oldVersion) {
          case 0:
            db.createObjectStore(OBJECT_STORE_NAME);
        }
      }
    });
  }
  return dbPromise;
}
async function set(appConfig, value) {
  const key = getKey(appConfig);
  const db = await getDbPromise();
  const tx = db.transaction(OBJECT_STORE_NAME, "readwrite");
  const objectStore = tx.objectStore(OBJECT_STORE_NAME);
  const oldValue = await objectStore.get(key);
  await objectStore.put(value, key);
  await tx.done;
  if (!oldValue || oldValue.fid !== value.fid) {
    fidChanged(appConfig, value.fid);
  }
  return value;
}
async function remove(appConfig) {
  const key = getKey(appConfig);
  const db = await getDbPromise();
  const tx = db.transaction(OBJECT_STORE_NAME, "readwrite");
  await tx.objectStore(OBJECT_STORE_NAME).delete(key);
  await tx.done;
}
async function update(appConfig, updateFn) {
  const key = getKey(appConfig);
  const db = await getDbPromise();
  const tx = db.transaction(OBJECT_STORE_NAME, "readwrite");
  const store = tx.objectStore(OBJECT_STORE_NAME);
  const oldValue = await store.get(key);
  const newValue = updateFn(oldValue);
  if (newValue === void 0) {
    await store.delete(key);
  } else {
    await store.put(newValue, key);
  }
  await tx.done;
  if (newValue && (!oldValue || oldValue.fid !== newValue.fid)) {
    fidChanged(appConfig, newValue.fid);
  }
  return newValue;
}
async function getInstallationEntry(installations) {
  let registrationPromise;
  const installationEntry = await update(installations.appConfig, (oldEntry) => {
    const installationEntry2 = updateOrCreateInstallationEntry(oldEntry);
    const entryWithPromise = triggerRegistrationIfNecessary(installations, installationEntry2);
    registrationPromise = entryWithPromise.registrationPromise;
    return entryWithPromise.installationEntry;
  });
  if (installationEntry.fid === INVALID_FID) {
    return { installationEntry: await registrationPromise };
  }
  return {
    installationEntry,
    registrationPromise
  };
}
function updateOrCreateInstallationEntry(oldEntry) {
  const entry = oldEntry || {
    fid: generateFid(),
    registrationStatus: 0
    /* RequestStatus.NOT_STARTED */
  };
  return clearTimedOutRequest(entry);
}
function triggerRegistrationIfNecessary(installations, installationEntry) {
  if (installationEntry.registrationStatus === 0) {
    if (!navigator.onLine) {
      const registrationPromiseWithError = Promise.reject(ERROR_FACTORY.create(
        "app-offline"
        /* ErrorCode.APP_OFFLINE */
      ));
      return {
        installationEntry,
        registrationPromise: registrationPromiseWithError
      };
    }
    const inProgressEntry = {
      fid: installationEntry.fid,
      registrationStatus: 1,
      registrationTime: Date.now()
    };
    const registrationPromise = registerInstallation(installations, inProgressEntry);
    return { installationEntry: inProgressEntry, registrationPromise };
  } else if (installationEntry.registrationStatus === 1) {
    return {
      installationEntry,
      registrationPromise: waitUntilFidRegistration(installations)
    };
  } else {
    return { installationEntry };
  }
}
async function registerInstallation(installations, installationEntry) {
  try {
    const registeredInstallationEntry = await createInstallationRequest(installations, installationEntry);
    return set(installations.appConfig, registeredInstallationEntry);
  } catch (e) {
    if (isServerError(e) && e.customData.serverCode === 409) {
      await remove(installations.appConfig);
    } else {
      await set(installations.appConfig, {
        fid: installationEntry.fid,
        registrationStatus: 0
        /* RequestStatus.NOT_STARTED */
      });
    }
    throw e;
  }
}
async function waitUntilFidRegistration(installations) {
  let entry = await updateInstallationRequest(installations.appConfig);
  while (entry.registrationStatus === 1) {
    await sleep(100);
    entry = await updateInstallationRequest(installations.appConfig);
  }
  if (entry.registrationStatus === 0) {
    const { installationEntry, registrationPromise } = await getInstallationEntry(installations);
    if (registrationPromise) {
      return registrationPromise;
    } else {
      return installationEntry;
    }
  }
  return entry;
}
function updateInstallationRequest(appConfig) {
  return update(appConfig, (oldEntry) => {
    if (!oldEntry) {
      throw ERROR_FACTORY.create(
        "installation-not-found"
        /* ErrorCode.INSTALLATION_NOT_FOUND */
      );
    }
    return clearTimedOutRequest(oldEntry);
  });
}
function clearTimedOutRequest(entry) {
  if (hasInstallationRequestTimedOut(entry)) {
    return {
      fid: entry.fid,
      registrationStatus: 0
      /* RequestStatus.NOT_STARTED */
    };
  }
  return entry;
}
function hasInstallationRequestTimedOut(installationEntry) {
  return installationEntry.registrationStatus === 1 && installationEntry.registrationTime + PENDING_TIMEOUT_MS < Date.now();
}
async function generateAuthTokenRequest({ appConfig, heartbeatServiceProvider }, installationEntry) {
  const endpoint = getGenerateAuthTokenEndpoint(appConfig, installationEntry);
  const headers = getHeadersWithAuth(appConfig, installationEntry);
  const heartbeatService = heartbeatServiceProvider.getImmediate({
    optional: true
  });
  if (heartbeatService) {
    const heartbeatsHeader = await heartbeatService.getHeartbeatsHeader();
    if (heartbeatsHeader) {
      headers.append("x-firebase-client", heartbeatsHeader);
    }
  }
  const body = {
    installation: {
      sdkVersion: PACKAGE_VERSION,
      appId: appConfig.appId
    }
  };
  const request = {
    method: "POST",
    headers,
    body: JSON.stringify(body)
  };
  const response = await retryIfServerError(() => fetch(endpoint, request));
  if (response.ok) {
    const responseValue = await response.json();
    const completedAuthToken = extractAuthTokenInfoFromResponse(responseValue);
    return completedAuthToken;
  } else {
    throw await getErrorFromResponse("Generate Auth Token", response);
  }
}
function getGenerateAuthTokenEndpoint(appConfig, { fid }) {
  return `${getInstallationsEndpoint(appConfig)}/${fid}/authTokens:generate`;
}
async function refreshAuthToken(installations, forceRefresh = false) {
  let tokenPromise;
  const entry = await update(installations.appConfig, (oldEntry) => {
    if (!isEntryRegistered(oldEntry)) {
      throw ERROR_FACTORY.create(
        "not-registered"
        /* ErrorCode.NOT_REGISTERED */
      );
    }
    const oldAuthToken = oldEntry.authToken;
    if (!forceRefresh && isAuthTokenValid(oldAuthToken)) {
      return oldEntry;
    } else if (oldAuthToken.requestStatus === 1) {
      tokenPromise = waitUntilAuthTokenRequest(installations, forceRefresh);
      return oldEntry;
    } else {
      if (!navigator.onLine) {
        throw ERROR_FACTORY.create(
          "app-offline"
          /* ErrorCode.APP_OFFLINE */
        );
      }
      const inProgressEntry = makeAuthTokenRequestInProgressEntry(oldEntry);
      tokenPromise = fetchAuthTokenFromServer(installations, inProgressEntry);
      return inProgressEntry;
    }
  });
  const authToken = tokenPromise ? await tokenPromise : entry.authToken;
  return authToken;
}
async function waitUntilAuthTokenRequest(installations, forceRefresh) {
  let entry = await updateAuthTokenRequest(installations.appConfig);
  while (entry.authToken.requestStatus === 1) {
    await sleep(100);
    entry = await updateAuthTokenRequest(installations.appConfig);
  }
  const authToken = entry.authToken;
  if (authToken.requestStatus === 0) {
    return refreshAuthToken(installations, forceRefresh);
  } else {
    return authToken;
  }
}
function updateAuthTokenRequest(appConfig) {
  return update(appConfig, (oldEntry) => {
    if (!isEntryRegistered(oldEntry)) {
      throw ERROR_FACTORY.create(
        "not-registered"
        /* ErrorCode.NOT_REGISTERED */
      );
    }
    const oldAuthToken = oldEntry.authToken;
    if (hasAuthTokenRequestTimedOut(oldAuthToken)) {
      return Object.assign(Object.assign({}, oldEntry), { authToken: {
        requestStatus: 0
        /* RequestStatus.NOT_STARTED */
      } });
    }
    return oldEntry;
  });
}
async function fetchAuthTokenFromServer(installations, installationEntry) {
  try {
    const authToken = await generateAuthTokenRequest(installations, installationEntry);
    const updatedInstallationEntry = Object.assign(Object.assign({}, installationEntry), { authToken });
    await set(installations.appConfig, updatedInstallationEntry);
    return authToken;
  } catch (e) {
    if (isServerError(e) && (e.customData.serverCode === 401 || e.customData.serverCode === 404)) {
      await remove(installations.appConfig);
    } else {
      const updatedInstallationEntry = Object.assign(Object.assign({}, installationEntry), { authToken: {
        requestStatus: 0
        /* RequestStatus.NOT_STARTED */
      } });
      await set(installations.appConfig, updatedInstallationEntry);
    }
    throw e;
  }
}
function isEntryRegistered(installationEntry) {
  return installationEntry !== void 0 && installationEntry.registrationStatus === 2;
}
function isAuthTokenValid(authToken) {
  return authToken.requestStatus === 2 && !isAuthTokenExpired(authToken);
}
function isAuthTokenExpired(authToken) {
  const now = Date.now();
  return now < authToken.creationTime || authToken.creationTime + authToken.expiresIn < now + TOKEN_EXPIRATION_BUFFER;
}
function makeAuthTokenRequestInProgressEntry(oldEntry) {
  const inProgressAuthToken = {
    requestStatus: 1,
    requestTime: Date.now()
  };
  return Object.assign(Object.assign({}, oldEntry), { authToken: inProgressAuthToken });
}
function hasAuthTokenRequestTimedOut(authToken) {
  return authToken.requestStatus === 1 && authToken.requestTime + PENDING_TIMEOUT_MS < Date.now();
}
async function getId(installations) {
  const installationsImpl = installations;
  const { installationEntry, registrationPromise } = await getInstallationEntry(installationsImpl);
  if (registrationPromise) {
    registrationPromise.catch(console.error);
  } else {
    refreshAuthToken(installationsImpl).catch(console.error);
  }
  return installationEntry.fid;
}
async function getToken(installations, forceRefresh = false) {
  const installationsImpl = installations;
  await completeInstallationRegistration(installationsImpl);
  const authToken = await refreshAuthToken(installationsImpl, forceRefresh);
  return authToken.token;
}
async function completeInstallationRegistration(installations) {
  const { registrationPromise } = await getInstallationEntry(installations);
  if (registrationPromise) {
    await registrationPromise;
  }
}
function extractAppConfig(app) {
  if (!app || !app.options) {
    throw getMissingValueError("App Configuration");
  }
  if (!app.name) {
    throw getMissingValueError("App Name");
  }
  const configKeys = [
    "projectId",
    "apiKey",
    "appId"
  ];
  for (const keyName of configKeys) {
    if (!app.options[keyName]) {
      throw getMissingValueError(keyName);
    }
  }
  return {
    appName: app.name,
    projectId: app.options.projectId,
    apiKey: app.options.apiKey,
    appId: app.options.appId
  };
}
function getMissingValueError(valueName) {
  return ERROR_FACTORY.create("missing-app-config-values", {
    valueName
  });
}
var INSTALLATIONS_NAME = "installations";
var INSTALLATIONS_NAME_INTERNAL = "installations-internal";
var publicFactory = (container) => {
  const app = container.getProvider("app").getImmediate();
  const appConfig = extractAppConfig(app);
  const heartbeatServiceProvider = _getProvider(app, "heartbeat");
  const installationsImpl = {
    app,
    appConfig,
    heartbeatServiceProvider,
    _delete: () => Promise.resolve()
  };
  return installationsImpl;
};
var internalFactory = (container) => {
  const app = container.getProvider("app").getImmediate();
  const installations = _getProvider(app, INSTALLATIONS_NAME).getImmediate();
  const installationsInternal = {
    getId: () => getId(installations),
    getToken: (forceRefresh) => getToken(installations, forceRefresh)
  };
  return installationsInternal;
};
function registerInstallations() {
  _registerComponent(new Component(
    INSTALLATIONS_NAME,
    publicFactory,
    "PUBLIC"
    /* ComponentType.PUBLIC */
  ));
  _registerComponent(new Component(
    INSTALLATIONS_NAME_INTERNAL,
    internalFactory,
    "PRIVATE"
    /* ComponentType.PRIVATE */
  ));
}
registerInstallations();
registerVersion(name, version);
registerVersion(name, version, "esm2017");

// node_modules/@firebase/performance/dist/esm/index.esm2017.js
var name2 = "@firebase/performance";
var version2 = "0.6.7";
var SDK_VERSION = version2;
var TRACE_START_MARK_PREFIX = "FB-PERF-TRACE-START";
var TRACE_STOP_MARK_PREFIX = "FB-PERF-TRACE-STOP";
var TRACE_MEASURE_PREFIX = "FB-PERF-TRACE-MEASURE";
var OOB_TRACE_PAGE_LOAD_PREFIX = "_wt_";
var FIRST_PAINT_COUNTER_NAME = "_fp";
var FIRST_CONTENTFUL_PAINT_COUNTER_NAME = "_fcp";
var FIRST_INPUT_DELAY_COUNTER_NAME = "_fid";
var CONFIG_LOCAL_STORAGE_KEY = "@firebase/performance/config";
var CONFIG_EXPIRY_LOCAL_STORAGE_KEY = "@firebase/performance/configexpire";
var SERVICE2 = "performance";
var SERVICE_NAME2 = "Performance";
var ERROR_DESCRIPTION_MAP2 = {
  [
    "trace started"
    /* ErrorCode.TRACE_STARTED_BEFORE */
  ]: "Trace {$traceName} was started before.",
  [
    "trace stopped"
    /* ErrorCode.TRACE_STOPPED_BEFORE */
  ]: "Trace {$traceName} is not running.",
  [
    "nonpositive trace startTime"
    /* ErrorCode.NONPOSITIVE_TRACE_START_TIME */
  ]: "Trace {$traceName} startTime should be positive.",
  [
    "nonpositive trace duration"
    /* ErrorCode.NONPOSITIVE_TRACE_DURATION */
  ]: "Trace {$traceName} duration should be positive.",
  [
    "no window"
    /* ErrorCode.NO_WINDOW */
  ]: "Window is not available.",
  [
    "no app id"
    /* ErrorCode.NO_APP_ID */
  ]: "App id is not available.",
  [
    "no project id"
    /* ErrorCode.NO_PROJECT_ID */
  ]: "Project id is not available.",
  [
    "no api key"
    /* ErrorCode.NO_API_KEY */
  ]: "Api key is not available.",
  [
    "invalid cc log"
    /* ErrorCode.INVALID_CC_LOG */
  ]: "Attempted to queue invalid cc event",
  [
    "FB not default"
    /* ErrorCode.FB_NOT_DEFAULT */
  ]: "Performance can only start when Firebase app instance is the default one.",
  [
    "RC response not ok"
    /* ErrorCode.RC_NOT_OK */
  ]: "RC response is not ok",
  [
    "invalid attribute name"
    /* ErrorCode.INVALID_ATTRIBUTE_NAME */
  ]: "Attribute name {$attributeName} is invalid.",
  [
    "invalid attribute value"
    /* ErrorCode.INVALID_ATTRIBUTE_VALUE */
  ]: "Attribute value {$attributeValue} is invalid.",
  [
    "invalid custom metric name"
    /* ErrorCode.INVALID_CUSTOM_METRIC_NAME */
  ]: "Custom metric name {$customMetricName} is invalid",
  [
    "invalid String merger input"
    /* ErrorCode.INVALID_STRING_MERGER_PARAMETER */
  ]: "Input for String merger is invalid, contact support team to resolve.",
  [
    "already initialized"
    /* ErrorCode.ALREADY_INITIALIZED */
  ]: "initializePerformance() has already been called with different options. To avoid this error, call initializePerformance() with the same options as when it was originally called, or call getPerformance() to return the already initialized instance."
};
var ERROR_FACTORY2 = new ErrorFactory(SERVICE2, SERVICE_NAME2, ERROR_DESCRIPTION_MAP2);
var consoleLogger = new Logger(SERVICE_NAME2);
consoleLogger.logLevel = LogLevel.INFO;
var apiInstance;
var windowInstance;
var Api = class _Api {
  constructor(window2) {
    this.window = window2;
    if (!window2) {
      throw ERROR_FACTORY2.create(
        "no window"
        /* ErrorCode.NO_WINDOW */
      );
    }
    this.performance = window2.performance;
    this.PerformanceObserver = window2.PerformanceObserver;
    this.windowLocation = window2.location;
    this.navigator = window2.navigator;
    this.document = window2.document;
    if (this.navigator && this.navigator.cookieEnabled) {
      this.localStorage = window2.localStorage;
    }
    if (window2.perfMetrics && window2.perfMetrics.onFirstInputDelay) {
      this.onFirstInputDelay = window2.perfMetrics.onFirstInputDelay;
    }
  }
  getUrl() {
    return this.windowLocation.href.split("?")[0];
  }
  mark(name3) {
    if (!this.performance || !this.performance.mark) {
      return;
    }
    this.performance.mark(name3);
  }
  measure(measureName, mark1, mark2) {
    if (!this.performance || !this.performance.measure) {
      return;
    }
    this.performance.measure(measureName, mark1, mark2);
  }
  getEntriesByType(type) {
    if (!this.performance || !this.performance.getEntriesByType) {
      return [];
    }
    return this.performance.getEntriesByType(type);
  }
  getEntriesByName(name3) {
    if (!this.performance || !this.performance.getEntriesByName) {
      return [];
    }
    return this.performance.getEntriesByName(name3);
  }
  getTimeOrigin() {
    return this.performance && (this.performance.timeOrigin || this.performance.timing.navigationStart);
  }
  requiredApisAvailable() {
    if (!fetch || !Promise || !areCookiesEnabled()) {
      consoleLogger.info("Firebase Performance cannot start if browser does not support fetch and Promise or cookie is disabled.");
      return false;
    }
    if (!isIndexedDBAvailable()) {
      consoleLogger.info("IndexedDB is not supported by current browser");
      return false;
    }
    return true;
  }
  setupObserver(entryType, callback) {
    if (!this.PerformanceObserver) {
      return;
    }
    const observer = new this.PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        callback(entry);
      }
    });
    observer.observe({ entryTypes: [entryType] });
  }
  static getInstance() {
    if (apiInstance === void 0) {
      apiInstance = new _Api(windowInstance);
    }
    return apiInstance;
  }
};
function setupApi(window2) {
  windowInstance = window2;
}
var iid;
function getIidPromise(installationsService) {
  const iidPromise = installationsService.getId();
  iidPromise.then((iidVal) => {
    iid = iidVal;
  });
  return iidPromise;
}
function getIid() {
  return iid;
}
function getAuthTokenPromise(installationsService) {
  const authTokenPromise = installationsService.getToken();
  authTokenPromise.then((authTokenVal) => {
  });
  return authTokenPromise;
}
function mergeStrings(part1, part2) {
  const sizeDiff = part1.length - part2.length;
  if (sizeDiff < 0 || sizeDiff > 1) {
    throw ERROR_FACTORY2.create(
      "invalid String merger input"
      /* ErrorCode.INVALID_STRING_MERGER_PARAMETER */
    );
  }
  const resultArray = [];
  for (let i = 0; i < part1.length; i++) {
    resultArray.push(part1.charAt(i));
    if (part2.length > i) {
      resultArray.push(part2.charAt(i));
    }
  }
  return resultArray.join("");
}
var settingsServiceInstance;
var SettingsService = class _SettingsService {
  constructor() {
    this.instrumentationEnabled = true;
    this.dataCollectionEnabled = true;
    this.loggingEnabled = false;
    this.tracesSamplingRate = 1;
    this.networkRequestsSamplingRate = 1;
    this.logEndPointUrl = "https://firebaselogging.googleapis.com/v0cc/log?format=json_proto";
    this.flTransportEndpointUrl = mergeStrings("hts/frbslgigp.ogepscmv/ieo/eaylg", "tp:/ieaeogn-agolai.o/1frlglgc/o");
    this.transportKey = mergeStrings("AzSC8r6ReiGqFMyfvgow", "Iayx0u-XT3vksVM-pIV");
    this.logSource = 462;
    this.logTraceAfterSampling = false;
    this.logNetworkAfterSampling = false;
    this.configTimeToLive = 12;
  }
  getFlTransportFullUrl() {
    return this.flTransportEndpointUrl.concat("?key=", this.transportKey);
  }
  static getInstance() {
    if (settingsServiceInstance === void 0) {
      settingsServiceInstance = new _SettingsService();
    }
    return settingsServiceInstance;
  }
};
var VisibilityState;
(function(VisibilityState2) {
  VisibilityState2[VisibilityState2["UNKNOWN"] = 0] = "UNKNOWN";
  VisibilityState2[VisibilityState2["VISIBLE"] = 1] = "VISIBLE";
  VisibilityState2[VisibilityState2["HIDDEN"] = 2] = "HIDDEN";
})(VisibilityState || (VisibilityState = {}));
var RESERVED_ATTRIBUTE_PREFIXES = ["firebase_", "google_", "ga_"];
var ATTRIBUTE_FORMAT_REGEX = new RegExp("^[a-zA-Z]\\w*$");
var MAX_ATTRIBUTE_NAME_LENGTH = 40;
var MAX_ATTRIBUTE_VALUE_LENGTH = 100;
function getServiceWorkerStatus() {
  const navigator2 = Api.getInstance().navigator;
  if (navigator2 === null || navigator2 === void 0 ? void 0 : navigator2.serviceWorker) {
    if (navigator2.serviceWorker.controller) {
      return 2;
    } else {
      return 3;
    }
  } else {
    return 1;
  }
}
function getVisibilityState() {
  const document = Api.getInstance().document;
  const visibilityState = document.visibilityState;
  switch (visibilityState) {
    case "visible":
      return VisibilityState.VISIBLE;
    case "hidden":
      return VisibilityState.HIDDEN;
    default:
      return VisibilityState.UNKNOWN;
  }
}
function getEffectiveConnectionType() {
  const navigator2 = Api.getInstance().navigator;
  const navigatorConnection = navigator2.connection;
  const effectiveType = navigatorConnection && navigatorConnection.effectiveType;
  switch (effectiveType) {
    case "slow-2g":
      return 1;
    case "2g":
      return 2;
    case "3g":
      return 3;
    case "4g":
      return 4;
    default:
      return 0;
  }
}
function isValidCustomAttributeName(name3) {
  if (name3.length === 0 || name3.length > MAX_ATTRIBUTE_NAME_LENGTH) {
    return false;
  }
  const matchesReservedPrefix = RESERVED_ATTRIBUTE_PREFIXES.some((prefix) => name3.startsWith(prefix));
  return !matchesReservedPrefix && !!name3.match(ATTRIBUTE_FORMAT_REGEX);
}
function isValidCustomAttributeValue(value) {
  return value.length !== 0 && value.length <= MAX_ATTRIBUTE_VALUE_LENGTH;
}
function getAppId(firebaseApp) {
  var _a;
  const appId = (_a = firebaseApp.options) === null || _a === void 0 ? void 0 : _a.appId;
  if (!appId) {
    throw ERROR_FACTORY2.create(
      "no app id"
      /* ErrorCode.NO_APP_ID */
    );
  }
  return appId;
}
function getProjectId(firebaseApp) {
  var _a;
  const projectId = (_a = firebaseApp.options) === null || _a === void 0 ? void 0 : _a.projectId;
  if (!projectId) {
    throw ERROR_FACTORY2.create(
      "no project id"
      /* ErrorCode.NO_PROJECT_ID */
    );
  }
  return projectId;
}
function getApiKey(firebaseApp) {
  var _a;
  const apiKey = (_a = firebaseApp.options) === null || _a === void 0 ? void 0 : _a.apiKey;
  if (!apiKey) {
    throw ERROR_FACTORY2.create(
      "no api key"
      /* ErrorCode.NO_API_KEY */
    );
  }
  return apiKey;
}
var REMOTE_CONFIG_SDK_VERSION = "0.0.1";
var DEFAULT_CONFIGS = {
  loggingEnabled: true
};
var FIS_AUTH_PREFIX = "FIREBASE_INSTALLATIONS_AUTH";
function getConfig(performanceController, iid2) {
  const config = getStoredConfig();
  if (config) {
    processConfig(config);
    return Promise.resolve();
  }
  return getRemoteConfig(performanceController, iid2).then(processConfig).then(
    (config2) => storeConfig(config2),
    /** Do nothing for error, use defaults set in settings service. */
    () => {
    }
  );
}
function getStoredConfig() {
  const localStorage = Api.getInstance().localStorage;
  if (!localStorage) {
    return;
  }
  const expiryString = localStorage.getItem(CONFIG_EXPIRY_LOCAL_STORAGE_KEY);
  if (!expiryString || !configValid(expiryString)) {
    return;
  }
  const configStringified = localStorage.getItem(CONFIG_LOCAL_STORAGE_KEY);
  if (!configStringified) {
    return;
  }
  try {
    const configResponse = JSON.parse(configStringified);
    return configResponse;
  } catch (_a) {
    return;
  }
}
function storeConfig(config) {
  const localStorage = Api.getInstance().localStorage;
  if (!config || !localStorage) {
    return;
  }
  localStorage.setItem(CONFIG_LOCAL_STORAGE_KEY, JSON.stringify(config));
  localStorage.setItem(CONFIG_EXPIRY_LOCAL_STORAGE_KEY, String(Date.now() + SettingsService.getInstance().configTimeToLive * 60 * 60 * 1e3));
}
var COULD_NOT_GET_CONFIG_MSG = "Could not fetch config, will use default configs";
function getRemoteConfig(performanceController, iid2) {
  return getAuthTokenPromise(performanceController.installations).then((authToken) => {
    const projectId = getProjectId(performanceController.app);
    const apiKey = getApiKey(performanceController.app);
    const configEndPoint = `https://firebaseremoteconfig.googleapis.com/v1/projects/${projectId}/namespaces/fireperf:fetch?key=${apiKey}`;
    const request = new Request(configEndPoint, {
      method: "POST",
      headers: { Authorization: `${FIS_AUTH_PREFIX} ${authToken}` },
      /* eslint-disable camelcase */
      body: JSON.stringify({
        app_instance_id: iid2,
        app_instance_id_token: authToken,
        app_id: getAppId(performanceController.app),
        app_version: SDK_VERSION,
        sdk_version: REMOTE_CONFIG_SDK_VERSION
      })
      /* eslint-enable camelcase */
    });
    return fetch(request).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw ERROR_FACTORY2.create(
        "RC response not ok"
        /* ErrorCode.RC_NOT_OK */
      );
    });
  }).catch(() => {
    consoleLogger.info(COULD_NOT_GET_CONFIG_MSG);
    return void 0;
  });
}
function processConfig(config) {
  if (!config) {
    return config;
  }
  const settingsServiceInstance2 = SettingsService.getInstance();
  const entries = config.entries || {};
  if (entries.fpr_enabled !== void 0) {
    settingsServiceInstance2.loggingEnabled = String(entries.fpr_enabled) === "true";
  } else {
    settingsServiceInstance2.loggingEnabled = DEFAULT_CONFIGS.loggingEnabled;
  }
  if (entries.fpr_log_source) {
    settingsServiceInstance2.logSource = Number(entries.fpr_log_source);
  } else if (DEFAULT_CONFIGS.logSource) {
    settingsServiceInstance2.logSource = DEFAULT_CONFIGS.logSource;
  }
  if (entries.fpr_log_endpoint_url) {
    settingsServiceInstance2.logEndPointUrl = entries.fpr_log_endpoint_url;
  } else if (DEFAULT_CONFIGS.logEndPointUrl) {
    settingsServiceInstance2.logEndPointUrl = DEFAULT_CONFIGS.logEndPointUrl;
  }
  if (entries.fpr_log_transport_key) {
    settingsServiceInstance2.transportKey = entries.fpr_log_transport_key;
  } else if (DEFAULT_CONFIGS.transportKey) {
    settingsServiceInstance2.transportKey = DEFAULT_CONFIGS.transportKey;
  }
  if (entries.fpr_vc_network_request_sampling_rate !== void 0) {
    settingsServiceInstance2.networkRequestsSamplingRate = Number(entries.fpr_vc_network_request_sampling_rate);
  } else if (DEFAULT_CONFIGS.networkRequestsSamplingRate !== void 0) {
    settingsServiceInstance2.networkRequestsSamplingRate = DEFAULT_CONFIGS.networkRequestsSamplingRate;
  }
  if (entries.fpr_vc_trace_sampling_rate !== void 0) {
    settingsServiceInstance2.tracesSamplingRate = Number(entries.fpr_vc_trace_sampling_rate);
  } else if (DEFAULT_CONFIGS.tracesSamplingRate !== void 0) {
    settingsServiceInstance2.tracesSamplingRate = DEFAULT_CONFIGS.tracesSamplingRate;
  }
  settingsServiceInstance2.logTraceAfterSampling = shouldLogAfterSampling(settingsServiceInstance2.tracesSamplingRate);
  settingsServiceInstance2.logNetworkAfterSampling = shouldLogAfterSampling(settingsServiceInstance2.networkRequestsSamplingRate);
  return config;
}
function configValid(expiry) {
  return Number(expiry) > Date.now();
}
function shouldLogAfterSampling(samplingRate) {
  return Math.random() <= samplingRate;
}
var initializationStatus = 1;
var initializationPromise;
function getInitializationPromise(performanceController) {
  initializationStatus = 2;
  initializationPromise = initializationPromise || initializePerf(performanceController);
  return initializationPromise;
}
function isPerfInitialized() {
  return initializationStatus === 3;
}
function initializePerf(performanceController) {
  return getDocumentReadyComplete().then(() => getIidPromise(performanceController.installations)).then((iid2) => getConfig(performanceController, iid2)).then(() => changeInitializationStatus(), () => changeInitializationStatus());
}
function getDocumentReadyComplete() {
  const document = Api.getInstance().document;
  return new Promise((resolve) => {
    if (document && document.readyState !== "complete") {
      const handler = () => {
        if (document.readyState === "complete") {
          document.removeEventListener("readystatechange", handler);
          resolve();
        }
      };
      document.addEventListener("readystatechange", handler);
    } else {
      resolve();
    }
  });
}
function changeInitializationStatus() {
  initializationStatus = 3;
}
var DEFAULT_SEND_INTERVAL_MS = 10 * 1e3;
var INITIAL_SEND_TIME_DELAY_MS = 5.5 * 1e3;
var DEFAULT_REMAINING_TRIES = 3;
var MAX_EVENT_COUNT_PER_REQUEST = 1e3;
var remainingTries = DEFAULT_REMAINING_TRIES;
var queue = [];
var isTransportSetup = false;
function setupTransportService() {
  if (!isTransportSetup) {
    processQueue(INITIAL_SEND_TIME_DELAY_MS);
    isTransportSetup = true;
  }
}
function processQueue(timeOffset) {
  setTimeout(() => {
    if (remainingTries === 0) {
      return;
    }
    if (!queue.length) {
      return processQueue(DEFAULT_SEND_INTERVAL_MS);
    }
    dispatchQueueEvents();
  }, timeOffset);
}
function dispatchQueueEvents() {
  const staged = queue.splice(0, MAX_EVENT_COUNT_PER_REQUEST);
  const log_event = staged.map((evt) => ({
    source_extension_json_proto3: evt.message,
    event_time_ms: String(evt.eventTime)
  }));
  const data = {
    request_time_ms: String(Date.now()),
    client_info: {
      client_type: 1,
      js_client_info: {}
    },
    log_source: SettingsService.getInstance().logSource,
    log_event
  };
  sendEventsToFl(data, staged).catch(() => {
    queue = [...staged, ...queue];
    remainingTries--;
    consoleLogger.info(`Tries left: ${remainingTries}.`);
    processQueue(DEFAULT_SEND_INTERVAL_MS);
  });
}
function sendEventsToFl(data, staged) {
  return postToFlEndpoint(data).then((res) => {
    if (!res.ok) {
      consoleLogger.info("Call to Firebase backend failed.");
    }
    return res.json();
  }).then((res) => {
    const transportWait = Number(res.nextRequestWaitMillis);
    let requestOffset = DEFAULT_SEND_INTERVAL_MS;
    if (!isNaN(transportWait)) {
      requestOffset = Math.max(transportWait, requestOffset);
    }
    const logResponseDetails = res.logResponseDetails;
    if (Array.isArray(logResponseDetails) && logResponseDetails.length > 0 && logResponseDetails[0].responseAction === "RETRY_REQUEST_LATER") {
      queue = [...staged, ...queue];
      consoleLogger.info(`Retry transport request later.`);
    }
    remainingTries = DEFAULT_REMAINING_TRIES;
    processQueue(requestOffset);
  });
}
function postToFlEndpoint(data) {
  const flTransportFullUrl = SettingsService.getInstance().getFlTransportFullUrl();
  return fetch(flTransportFullUrl, {
    method: "POST",
    body: JSON.stringify(data)
  });
}
function addToQueue(evt) {
  if (!evt.eventTime || !evt.message) {
    throw ERROR_FACTORY2.create(
      "invalid cc log"
      /* ErrorCode.INVALID_CC_LOG */
    );
  }
  queue = [...queue, evt];
}
function transportHandler(serializer2) {
  return (...args) => {
    const message = serializer2(...args);
    addToQueue({
      message,
      eventTime: Date.now()
    });
  };
}
var logger;
function sendLog(resource, resourceType) {
  if (!logger) {
    logger = transportHandler(serializer);
  }
  logger(resource, resourceType);
}
function logTrace(trace2) {
  const settingsService = SettingsService.getInstance();
  if (!settingsService.instrumentationEnabled && trace2.isAuto) {
    return;
  }
  if (!settingsService.dataCollectionEnabled && !trace2.isAuto) {
    return;
  }
  if (!Api.getInstance().requiredApisAvailable()) {
    return;
  }
  if (trace2.isAuto && getVisibilityState() !== VisibilityState.VISIBLE) {
    return;
  }
  if (isPerfInitialized()) {
    sendTraceLog(trace2);
  } else {
    getInitializationPromise(trace2.performanceController).then(() => sendTraceLog(trace2), () => sendTraceLog(trace2));
  }
}
function sendTraceLog(trace2) {
  if (!getIid()) {
    return;
  }
  const settingsService = SettingsService.getInstance();
  if (!settingsService.loggingEnabled || !settingsService.logTraceAfterSampling) {
    return;
  }
  setTimeout(() => sendLog(
    trace2,
    1
    /* ResourceType.Trace */
  ), 0);
}
function logNetworkRequest(networkRequest) {
  const settingsService = SettingsService.getInstance();
  if (!settingsService.instrumentationEnabled) {
    return;
  }
  const networkRequestUrl = networkRequest.url;
  const logEndpointUrl = settingsService.logEndPointUrl.split("?")[0];
  const flEndpointUrl = settingsService.flTransportEndpointUrl.split("?")[0];
  if (networkRequestUrl === logEndpointUrl || networkRequestUrl === flEndpointUrl) {
    return;
  }
  if (!settingsService.loggingEnabled || !settingsService.logNetworkAfterSampling) {
    return;
  }
  setTimeout(() => sendLog(
    networkRequest,
    0
    /* ResourceType.NetworkRequest */
  ), 0);
}
function serializer(resource, resourceType) {
  if (resourceType === 0) {
    return serializeNetworkRequest(resource);
  }
  return serializeTrace(resource);
}
function serializeNetworkRequest(networkRequest) {
  const networkRequestMetric = {
    url: networkRequest.url,
    http_method: networkRequest.httpMethod || 0,
    http_response_code: 200,
    response_payload_bytes: networkRequest.responsePayloadBytes,
    client_start_time_us: networkRequest.startTimeUs,
    time_to_response_initiated_us: networkRequest.timeToResponseInitiatedUs,
    time_to_response_completed_us: networkRequest.timeToResponseCompletedUs
  };
  const perfMetric = {
    application_info: getApplicationInfo(networkRequest.performanceController.app),
    network_request_metric: networkRequestMetric
  };
  return JSON.stringify(perfMetric);
}
function serializeTrace(trace2) {
  const traceMetric = {
    name: trace2.name,
    is_auto: trace2.isAuto,
    client_start_time_us: trace2.startTimeUs,
    duration_us: trace2.durationUs
  };
  if (Object.keys(trace2.counters).length !== 0) {
    traceMetric.counters = trace2.counters;
  }
  const customAttributes = trace2.getAttributes();
  if (Object.keys(customAttributes).length !== 0) {
    traceMetric.custom_attributes = customAttributes;
  }
  const perfMetric = {
    application_info: getApplicationInfo(trace2.performanceController.app),
    trace_metric: traceMetric
  };
  return JSON.stringify(perfMetric);
}
function getApplicationInfo(firebaseApp) {
  return {
    google_app_id: getAppId(firebaseApp),
    app_instance_id: getIid(),
    web_app_info: {
      sdk_version: SDK_VERSION,
      page_url: Api.getInstance().getUrl(),
      service_worker_status: getServiceWorkerStatus(),
      visibility_state: getVisibilityState(),
      effective_connection_type: getEffectiveConnectionType()
    },
    application_process_state: 0
  };
}
var MAX_METRIC_NAME_LENGTH = 100;
var RESERVED_AUTO_PREFIX = "_";
var oobMetrics = [
  FIRST_PAINT_COUNTER_NAME,
  FIRST_CONTENTFUL_PAINT_COUNTER_NAME,
  FIRST_INPUT_DELAY_COUNTER_NAME
];
function isValidMetricName(name3, traceName) {
  if (name3.length === 0 || name3.length > MAX_METRIC_NAME_LENGTH) {
    return false;
  }
  return traceName && traceName.startsWith(OOB_TRACE_PAGE_LOAD_PREFIX) && oobMetrics.indexOf(name3) > -1 || !name3.startsWith(RESERVED_AUTO_PREFIX);
}
function convertMetricValueToInteger(providedValue) {
  const valueAsInteger = Math.floor(providedValue);
  if (valueAsInteger < providedValue) {
    consoleLogger.info(`Metric value should be an Integer, setting the value as : ${valueAsInteger}.`);
  }
  return valueAsInteger;
}
var Trace = class _Trace {
  /**
   * @param performanceController The performance controller running.
   * @param name The name of the trace.
   * @param isAuto If the trace is auto-instrumented.
   * @param traceMeasureName The name of the measure marker in user timing specification. This field
   * is only set when the trace is built for logging when the user directly uses the user timing
   * api (performance.mark and performance.measure).
   */
  constructor(performanceController, name3, isAuto = false, traceMeasureName) {
    this.performanceController = performanceController;
    this.name = name3;
    this.isAuto = isAuto;
    this.state = 1;
    this.customAttributes = {};
    this.counters = {};
    this.api = Api.getInstance();
    this.randomId = Math.floor(Math.random() * 1e6);
    if (!this.isAuto) {
      this.traceStartMark = `${TRACE_START_MARK_PREFIX}-${this.randomId}-${this.name}`;
      this.traceStopMark = `${TRACE_STOP_MARK_PREFIX}-${this.randomId}-${this.name}`;
      this.traceMeasure = traceMeasureName || `${TRACE_MEASURE_PREFIX}-${this.randomId}-${this.name}`;
      if (traceMeasureName) {
        this.calculateTraceMetrics();
      }
    }
  }
  /**
   * Starts a trace. The measurement of the duration starts at this point.
   */
  start() {
    if (this.state !== 1) {
      throw ERROR_FACTORY2.create("trace started", {
        traceName: this.name
      });
    }
    this.api.mark(this.traceStartMark);
    this.state = 2;
  }
  /**
   * Stops the trace. The measurement of the duration of the trace stops at this point and trace
   * is logged.
   */
  stop() {
    if (this.state !== 2) {
      throw ERROR_FACTORY2.create("trace stopped", {
        traceName: this.name
      });
    }
    this.state = 3;
    this.api.mark(this.traceStopMark);
    this.api.measure(this.traceMeasure, this.traceStartMark, this.traceStopMark);
    this.calculateTraceMetrics();
    logTrace(this);
  }
  /**
   * Records a trace with predetermined values. If this method is used a trace is created and logged
   * directly. No need to use start and stop methods.
   * @param startTime Trace start time since epoch in millisec
   * @param duration The duraction of the trace in millisec
   * @param options An object which can optionally hold maps of custom metrics and custom attributes
   */
  record(startTime, duration, options) {
    if (startTime <= 0) {
      throw ERROR_FACTORY2.create("nonpositive trace startTime", {
        traceName: this.name
      });
    }
    if (duration <= 0) {
      throw ERROR_FACTORY2.create("nonpositive trace duration", {
        traceName: this.name
      });
    }
    this.durationUs = Math.floor(duration * 1e3);
    this.startTimeUs = Math.floor(startTime * 1e3);
    if (options && options.attributes) {
      this.customAttributes = Object.assign({}, options.attributes);
    }
    if (options && options.metrics) {
      for (const metricName of Object.keys(options.metrics)) {
        if (!isNaN(Number(options.metrics[metricName]))) {
          this.counters[metricName] = Math.floor(Number(options.metrics[metricName]));
        }
      }
    }
    logTrace(this);
  }
  /**
   * Increments a custom metric by a certain number or 1 if number not specified. Will create a new
   * custom metric if one with the given name does not exist. The value will be floored down to an
   * integer.
   * @param counter Name of the custom metric
   * @param numAsInteger Increment by value
   */
  incrementMetric(counter, numAsInteger = 1) {
    if (this.counters[counter] === void 0) {
      this.putMetric(counter, numAsInteger);
    } else {
      this.putMetric(counter, this.counters[counter] + numAsInteger);
    }
  }
  /**
   * Sets a custom metric to a specified value. Will create a new custom metric if one with the
   * given name does not exist. The value will be floored down to an integer.
   * @param counter Name of the custom metric
   * @param numAsInteger Set custom metric to this value
   */
  putMetric(counter, numAsInteger) {
    if (isValidMetricName(counter, this.name)) {
      this.counters[counter] = convertMetricValueToInteger(numAsInteger !== null && numAsInteger !== void 0 ? numAsInteger : 0);
    } else {
      throw ERROR_FACTORY2.create("invalid custom metric name", {
        customMetricName: counter
      });
    }
  }
  /**
   * Returns the value of the custom metric by that name. If a custom metric with that name does
   * not exist will return zero.
   * @param counter
   */
  getMetric(counter) {
    return this.counters[counter] || 0;
  }
  /**
   * Sets a custom attribute of a trace to a certain value.
   * @param attr
   * @param value
   */
  putAttribute(attr, value) {
    const isValidName = isValidCustomAttributeName(attr);
    const isValidValue = isValidCustomAttributeValue(value);
    if (isValidName && isValidValue) {
      this.customAttributes[attr] = value;
      return;
    }
    if (!isValidName) {
      throw ERROR_FACTORY2.create("invalid attribute name", {
        attributeName: attr
      });
    }
    if (!isValidValue) {
      throw ERROR_FACTORY2.create("invalid attribute value", {
        attributeValue: value
      });
    }
  }
  /**
   * Retrieves the value a custom attribute of a trace is set to.
   * @param attr
   */
  getAttribute(attr) {
    return this.customAttributes[attr];
  }
  removeAttribute(attr) {
    if (this.customAttributes[attr] === void 0) {
      return;
    }
    delete this.customAttributes[attr];
  }
  getAttributes() {
    return Object.assign({}, this.customAttributes);
  }
  setStartTime(startTime) {
    this.startTimeUs = startTime;
  }
  setDuration(duration) {
    this.durationUs = duration;
  }
  /**
   * Calculates and assigns the duration and start time of the trace using the measure performance
   * entry.
   */
  calculateTraceMetrics() {
    const perfMeasureEntries = this.api.getEntriesByName(this.traceMeasure);
    const perfMeasureEntry = perfMeasureEntries && perfMeasureEntries[0];
    if (perfMeasureEntry) {
      this.durationUs = Math.floor(perfMeasureEntry.duration * 1e3);
      this.startTimeUs = Math.floor((perfMeasureEntry.startTime + this.api.getTimeOrigin()) * 1e3);
    }
  }
  /**
   * @param navigationTimings A single element array which contains the navigationTIming object of
   * the page load
   * @param paintTimings A array which contains paintTiming object of the page load
   * @param firstInputDelay First input delay in millisec
   */
  static createOobTrace(performanceController, navigationTimings, paintTimings, firstInputDelay) {
    const route = Api.getInstance().getUrl();
    if (!route) {
      return;
    }
    const trace2 = new _Trace(performanceController, OOB_TRACE_PAGE_LOAD_PREFIX + route, true);
    const timeOriginUs = Math.floor(Api.getInstance().getTimeOrigin() * 1e3);
    trace2.setStartTime(timeOriginUs);
    if (navigationTimings && navigationTimings[0]) {
      trace2.setDuration(Math.floor(navigationTimings[0].duration * 1e3));
      trace2.putMetric("domInteractive", Math.floor(navigationTimings[0].domInteractive * 1e3));
      trace2.putMetric("domContentLoadedEventEnd", Math.floor(navigationTimings[0].domContentLoadedEventEnd * 1e3));
      trace2.putMetric("loadEventEnd", Math.floor(navigationTimings[0].loadEventEnd * 1e3));
    }
    const FIRST_PAINT = "first-paint";
    const FIRST_CONTENTFUL_PAINT = "first-contentful-paint";
    if (paintTimings) {
      const firstPaint = paintTimings.find((paintObject) => paintObject.name === FIRST_PAINT);
      if (firstPaint && firstPaint.startTime) {
        trace2.putMetric(FIRST_PAINT_COUNTER_NAME, Math.floor(firstPaint.startTime * 1e3));
      }
      const firstContentfulPaint = paintTimings.find((paintObject) => paintObject.name === FIRST_CONTENTFUL_PAINT);
      if (firstContentfulPaint && firstContentfulPaint.startTime) {
        trace2.putMetric(FIRST_CONTENTFUL_PAINT_COUNTER_NAME, Math.floor(firstContentfulPaint.startTime * 1e3));
      }
      if (firstInputDelay) {
        trace2.putMetric(FIRST_INPUT_DELAY_COUNTER_NAME, Math.floor(firstInputDelay * 1e3));
      }
    }
    logTrace(trace2);
  }
  static createUserTimingTrace(performanceController, measureName) {
    const trace2 = new _Trace(performanceController, measureName, false, measureName);
    logTrace(trace2);
  }
};
function createNetworkRequestEntry(performanceController, entry) {
  const performanceEntry = entry;
  if (!performanceEntry || performanceEntry.responseStart === void 0) {
    return;
  }
  const timeOrigin = Api.getInstance().getTimeOrigin();
  const startTimeUs = Math.floor((performanceEntry.startTime + timeOrigin) * 1e3);
  const timeToResponseInitiatedUs = performanceEntry.responseStart ? Math.floor((performanceEntry.responseStart - performanceEntry.startTime) * 1e3) : void 0;
  const timeToResponseCompletedUs = Math.floor((performanceEntry.responseEnd - performanceEntry.startTime) * 1e3);
  const url = performanceEntry.name && performanceEntry.name.split("?")[0];
  const networkRequest = {
    performanceController,
    url,
    responsePayloadBytes: performanceEntry.transferSize,
    startTimeUs,
    timeToResponseInitiatedUs,
    timeToResponseCompletedUs
  };
  logNetworkRequest(networkRequest);
}
var FID_WAIT_TIME_MS = 5e3;
function setupOobResources(performanceController) {
  if (!getIid()) {
    return;
  }
  setTimeout(() => setupOobTraces(performanceController), 0);
  setTimeout(() => setupNetworkRequests(performanceController), 0);
  setTimeout(() => setupUserTimingTraces(performanceController), 0);
}
function setupNetworkRequests(performanceController) {
  const api = Api.getInstance();
  const resources = api.getEntriesByType("resource");
  for (const resource of resources) {
    createNetworkRequestEntry(performanceController, resource);
  }
  api.setupObserver("resource", (entry) => createNetworkRequestEntry(performanceController, entry));
}
function setupOobTraces(performanceController) {
  const api = Api.getInstance();
  const navigationTimings = api.getEntriesByType("navigation");
  const paintTimings = api.getEntriesByType("paint");
  if (api.onFirstInputDelay) {
    let timeoutId = setTimeout(() => {
      Trace.createOobTrace(performanceController, navigationTimings, paintTimings);
      timeoutId = void 0;
    }, FID_WAIT_TIME_MS);
    api.onFirstInputDelay((fid) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        Trace.createOobTrace(performanceController, navigationTimings, paintTimings, fid);
      }
    });
  } else {
    Trace.createOobTrace(performanceController, navigationTimings, paintTimings);
  }
}
function setupUserTimingTraces(performanceController) {
  const api = Api.getInstance();
  const measures = api.getEntriesByType("measure");
  for (const measure of measures) {
    createUserTimingTrace(performanceController, measure);
  }
  api.setupObserver("measure", (entry) => createUserTimingTrace(performanceController, entry));
}
function createUserTimingTrace(performanceController, measure) {
  const measureName = measure.name;
  if (measureName.substring(0, TRACE_MEASURE_PREFIX.length) === TRACE_MEASURE_PREFIX) {
    return;
  }
  Trace.createUserTimingTrace(performanceController, measureName);
}
var PerformanceController = class {
  constructor(app, installations) {
    this.app = app;
    this.installations = installations;
    this.initialized = false;
  }
  /**
   * This method *must* be called internally as part of creating a
   * PerformanceController instance.
   *
   * Currently it's not possible to pass the settings object through the
   * constructor using Components, so this method exists to be called with the
   * desired settings, to ensure nothing is collected without the user's
   * consent.
   */
  _init(settings) {
    if (this.initialized) {
      return;
    }
    if ((settings === null || settings === void 0 ? void 0 : settings.dataCollectionEnabled) !== void 0) {
      this.dataCollectionEnabled = settings.dataCollectionEnabled;
    }
    if ((settings === null || settings === void 0 ? void 0 : settings.instrumentationEnabled) !== void 0) {
      this.instrumentationEnabled = settings.instrumentationEnabled;
    }
    if (Api.getInstance().requiredApisAvailable()) {
      validateIndexedDBOpenable().then((isAvailable) => {
        if (isAvailable) {
          setupTransportService();
          getInitializationPromise(this).then(() => setupOobResources(this), () => setupOobResources(this));
          this.initialized = true;
        }
      }).catch((error) => {
        consoleLogger.info(`Environment doesn't support IndexedDB: ${error}`);
      });
    } else {
      consoleLogger.info('Firebase Performance cannot start if the browser does not support "Fetch" and "Promise", or cookies are disabled.');
    }
  }
  set instrumentationEnabled(val) {
    SettingsService.getInstance().instrumentationEnabled = val;
  }
  get instrumentationEnabled() {
    return SettingsService.getInstance().instrumentationEnabled;
  }
  set dataCollectionEnabled(val) {
    SettingsService.getInstance().dataCollectionEnabled = val;
  }
  get dataCollectionEnabled() {
    return SettingsService.getInstance().dataCollectionEnabled;
  }
};
var DEFAULT_ENTRY_NAME = "[DEFAULT]";
function getPerformance(app = getApp()) {
  app = getModularInstance(app);
  const provider = _getProvider(app, "performance");
  const perfInstance = provider.getImmediate();
  return perfInstance;
}
function initializePerformance(app, settings) {
  app = getModularInstance(app);
  const provider = _getProvider(app, "performance");
  if (provider.isInitialized()) {
    const existingInstance = provider.getImmediate();
    const initialSettings = provider.getOptions();
    if (deepEqual(initialSettings, settings !== null && settings !== void 0 ? settings : {})) {
      return existingInstance;
    } else {
      throw ERROR_FACTORY2.create(
        "already initialized"
        /* ErrorCode.ALREADY_INITIALIZED */
      );
    }
  }
  const perfInstance = provider.initialize({
    options: settings
  });
  return perfInstance;
}
function trace(performance, name3) {
  performance = getModularInstance(performance);
  return new Trace(performance, name3);
}
var factory = (container, { options: settings }) => {
  const app = container.getProvider("app").getImmediate();
  const installations = container.getProvider("installations-internal").getImmediate();
  if (app.name !== DEFAULT_ENTRY_NAME) {
    throw ERROR_FACTORY2.create(
      "FB not default"
      /* ErrorCode.FB_NOT_DEFAULT */
    );
  }
  if (typeof window === "undefined") {
    throw ERROR_FACTORY2.create(
      "no window"
      /* ErrorCode.NO_WINDOW */
    );
  }
  setupApi(window);
  const perfInstance = new PerformanceController(app, installations);
  perfInstance._init(settings);
  return perfInstance;
};
function registerPerformance() {
  _registerComponent(new Component(
    "performance",
    factory,
    "PUBLIC"
    /* ComponentType.PUBLIC */
  ));
  registerVersion(name2, version2);
  registerVersion(name2, version2, "esm2017");
}
registerPerformance();
export {
  getPerformance,
  initializePerformance,
  trace
};
/*! Bundled license information:

@firebase/installations/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/installations/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/installations/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/installations/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/installations/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/installations/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/performance/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
*/
//# sourceMappingURL=firebase_performance.js.map
