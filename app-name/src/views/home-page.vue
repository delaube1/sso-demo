<template>
  <div>
    <h2 class="content-block">主页</h2>
    <div class="content-block">
      <div class="dx-card responsive-paddings">
        <div class="logos-container">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // import axios from "core-js/internals/queue";
  // export default {
  //   data() {
  //     return {
  //       responseData: null
  //     };
  //   },
  //   created() {
  //     axios.get("http://localhost:9010/view/index")
  //         .then(response => {
  //           this.responseData = response.data;
  //           console.log(this.responseData)
  //         })
  //         .catch(error => {
  //           console.error(error);
  //         });
  //   }
  // }
</script>

<style lang="scss">
.logos-container {
  margin: 20px 0 40px 0;
  text-align: center;
  svg {
    display: inline-block;
  }
}

.devextreme-logo {
  width: 200px;
  height: 34px;
  margin-bottom: 17px;
}

.vue-logo {
  width: 180px;
  height: 62px;
}

.plus {
  margin: 20px 10px;
  width: 22px;
  height: 22px;
}

.screen-x-small .logos-container {
  svg {
    width: 100%;
    display: block;
    &.plus {
      margin: 0;
    }
  }
}
</style>
