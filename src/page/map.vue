<template>
  <div id="allmap">

  </div>
</template>

<style>
  #allmap {
    position: absolute;
    left: 10px;
    top:10px;
    bottom: 10px;
    right: 10px;
    box-shadow: 0 0 6px #c8c8c8;
  }
</style>

<script>
  import BMap from 'BMap'

  export default {
    data() {
      return {msg: '初始代模板'}
    },
    mounted() {
      this.createMap();
    },
    methods: {
      createMap() {
        let map = new BMap.Map("allmap");          // 创建地图实例
        let point = new BMap.Point(116.331398, 39.897445);  // 创建点坐标
        map.centerAndZoom(point, 15);                 // 初始化地图，设置中心点坐标和地图级别
        map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放

        map.addControl(new BMap.NavigationControl());
        map.addControl(new BMap.ScaleControl());
        map.addControl(new BMap.OverviewMapControl());
        map.addControl(new BMap.MapTypeControl());
        map.setCurrentCity("武汉"); // 仅当设置城市信息时，MapTypeControl的切换功能才能可用
      }
    }
  }
</script>
