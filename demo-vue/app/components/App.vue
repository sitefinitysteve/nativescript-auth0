<template>
    <Page>
        <ActionBar title="Welcome to NativeScript-Vue!"/>
        <StackLayout class="p-20">
            <Button text="Login" @tap="onTap"></Button>
            <Label :text="message" class="t-20 text-center c-black" textWrap="true"/>
        </StackLayout>
    </Page>
</template>

<script lang="ts">
  import { Auth0 } from 'nativescript-auth0';
  const auth0 = new Auth0('q5atQzi6DgmWBpHWRJbd7MBNa5eLBPRp', 'nativescript.auth0.com');
  export default {
    data() {
      const data = {
        message: 'Hello World!',
        onTap: function () {
          auth0.webAuthentication({
            scope: 'openid offline_access'
          }).then((result) => {
            data.message = JSON.stringify(result);
            console.log(result);
          }).catch((e: Error) => console.log(e, e.stack));
        }
      }
      return data;
    }
  }
</script>

<style scoped>
    ActionBar {
        background-color: #53ba82;
        color: #ffffff;
    }

    .message {
        vertical-align: center;
        text-align: center;
        font-size: 20;
        color: #333333;
    }
</style>
