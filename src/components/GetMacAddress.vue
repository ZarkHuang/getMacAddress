<template>
  <div class="p-4">
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="confirmAndGetMacAddress">
      Get MAC Address
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
</script>

<style scoped></style>
