<template>
  <form class="login-form" @submit.prevent="onSubmit">
    <dx-form :form-data="formData" :disabled="loading">
      <dx-item
        data-field="email"
        editor-type="dxTextBox"
        :editor-options="{ stylingMode: 'filled', placeholder: 'name', mode: 'name' }"
      >
        <dx-required-rule message="Email is required" />
        <dx-label :visible="false" />
      </dx-item>
      <dx-item
        data-field='password'
        editor-type='dxTextBox'
        :editor-options="{ stylingMode: 'filled', placeholder: 'Password', mode: 'password' }"
      >
        <dx-required-rule message="Password is required" />
        <dx-label :visible="false" />
      </dx-item>
      <dx-button-item>
        <dx-button-options
          width="100%"
          type="default"
          template="signInTemplate"
          :use-submit-behavior="true"
        >
        </dx-button-options>
      </dx-button-item>
      <template #signInTemplate>
        <div>
          <span class="dx-button-text">
            <dx-load-indicator v-if="loading" width="24px" height="24px" :visible="true" />
            <span v-if="!loading">Sign In</span>
          </span>
        </div>
      </template>
    </dx-form>
  </form>
</template>

<script>
import DxLoadIndicator from "devextreme-vue/load-indicator";
import DxForm, {
  DxItem,
  DxLabel,
  DxButtonItem,
  DxButtonOptions
} from "devextreme-vue/form";
import notify from 'devextreme/ui/notify';

import auth from "../auth";
import axios from "core-js/internals/queue";

export default {
  data() {
    return {
      formData: {},
      loading: false
    };
  },
  mounted() {
    axios.get('http://localhost:8080/view/login')
        .then(response => {
          this.data = response.data;

          console.log(this.data);
        })
        .catch(error => {
          console.log(error);
        });
  },
  methods: {
    onSubmit: async function() {
      const { email, password } = this.formData;
      this.loading = true;

      const result = await auth.logIn(email, password);
      if (!result.isOk) {
        this.loading = false;
        notify(result.message, "error", 2000);
      } else {
        this.$router.go(-1);
      }
    }
  },
  components: {
    DxLoadIndicator,
    DxForm,
    DxItem,
    DxLabel,
    DxButtonItem,
    DxButtonOptions
  }
};

</script>

<style lang="scss">
@import "../themes/generated/variables.base.scss";

.login-form {
  .link {
    text-align: center;
    font-size: 16px;
    font-style: normal;

    a {
      text-decoration: none;
    }
  }

  .form-text {
    margin: 10px 0;
    color: rgba($base-text-color, alpha($base-text-color) * 0.7);
  }
}
</style>
