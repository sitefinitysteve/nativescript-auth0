<template>
<Page>
    <ScrollView>
        <StackLayout class="p-20">
            <StackLayout orientation="horizontal" horizontalAlignment="center" class="m-b-20">
                <Image src="~/assets/nativescript-vue-logo.png" height="100" />
                <Image src="~/assets/auth0-logo.png" height="100" />
            </StackLayout>

            <Button text="Login" class="-primary" @tap="onTap" />
            <Label :text="message" class="body mono p-20" textWrap />
        </StackLayout>
    </ScrollView>
</Page>
</template>

<script lang="ts">
import { Auth0, Credentials, WebAuthException } from 'nativescript-auth0';

export default {
  data() {
    return {
      auth0: new Auth0('q5atQzi6DgmWBpHWRJbd7MBNa5eLBPRp', 'nativescript.auth0.com'),
      message: ''
    };
  },
  methods: {
    onTap() {
      this.auth0.webAuthentication({
        scope: 'openid offline_access'
      }).then((result: Credentials) => {
        this.message = JSON.stringify(result, null, '  ');
        console.log(result);
      }).catch((error: Error | WebAuthException) => {
        this.message = JSON.stringify(error, null, '  ');
        console.log(error.stack);
      });
    }
  }
}
</script>

<style lang="scss">
.mono {
  font-family: monospace;
}
</style>
