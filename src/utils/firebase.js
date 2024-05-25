
// firebase doc: https://firebase.google.com/docs?authuser=0&hl=zh-cn

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getPerformance } from "firebase/performance";
// import { getAnalytics } from 'firebase/analytics';
// import { getStorage } from 'firebase/storage'
// import { getRemoteConfig } from "firebase/remote-config";

const firebaseConfig = {
  apiKey: "AIzaSyDsKxzkog5TI8FfzcksB6oICksGXIl7AZQ",
  authDomain: "cbtgeek-static.firebaseapp.com",
  databaseURL: "https://cbtgeek-static-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "cbtgeek-static",
  storageBucket: "cbtgeek-static.appspot.com",
  messagingSenderId: "199433153790",
  appId: "1:199433153790:web:a8819d326d16a3d7dc89af",
  measurementId: "G-3BHJFDYKLY"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
// const config = getRemoteConfig(app)
// const analytics = getAnalytics(app);
export const perf = getPerformance(app);
// const storage = getStorage(app, "gs://cbtgeek-static.appspot.com");


export async function getCities() {
  const qs = await getDocs(collection(db, 'cities'));
  return qs.docs.map(doc => doc.data())
}

/**
 * firebase 重要功能
 * 
 * 1. firestore 和 database，nosql 数据库
 * 2. storage，文件存储
 * 3. hosting，web 应用托管
 * 4. cloud functions，云函数
 * 5. analytics，谷歌分析
 * 6. remote config，
 */