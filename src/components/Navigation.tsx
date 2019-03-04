import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Navigation extends Vue {
  public render() {
    return (
      <v-toolbar app fixed dark flat dense>
        <v-menu offset-y>
          <v-btn flat dark slot="activator">
            <v-icon left>mdi-menu</v-icon>
            {this.$t('system.modules.aniList')}
          </v-btn>
        </v-menu>

        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn flat exact to={{ name: 'Home' }}>Home</v-btn>
          <v-btn flat exact to={{ name: 'About' }}>About</v-btn>
        </v-toolbar-items>

      </v-toolbar>
    );
  }
}
