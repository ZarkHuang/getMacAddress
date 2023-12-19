<template>
  <div class="p-4">
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="confirmAndGetMacAddress">
      Get MAC Address
    </button>
    <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" @click="getDeviceId">
      Get Device ID
    </button>
  </div>
</template>


<script lang="ts" setup>
import { ref } from 'vue';
import axios from 'axios';

const confirmAndGetMacAddress = async () => {
  if (window.confirm('是否同意獲取Mac地址？')) {
    try {
      const response = await axios.get('http://localhost:3000/get-mac-address');
      const macAddress = response.data;
      // console.log(macAddress)
      localStorage.setItem('macAddress', macAddress);
      alert(`MAC Address: ${macAddress}`);
    } catch (error) {
      console.error('Mac地址獲取有誤!:', error);
    }
  }
};

const getDeviceId = async () => {
  try {
    await navigator.mediaDevices.getUserMedia({ audio: true }).catch(() => {});
    await navigator.mediaDevices.getUserMedia({ video: true }).catch(() => {});

    // 獲取設備資訊
    const devices = await navigator.mediaDevices.enumerateDevices();
    const deviceInfo = devices.map(device => ({
      kind: device.kind,
      label: device.label,
      id: device.deviceId
    }));

    // 儲存設備資訊
    localStorage.setItem('deviceInfo', JSON.stringify(deviceInfo));
  } catch (error) {
    console.error('Error getting device info:', error);
  }
}




</script>

<style scoped></style>
