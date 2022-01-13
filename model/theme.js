import {Http} from '../utils/http';

class Theme{
  static themeA = 't-1';
  static themeB = 't-2';
  static themeC = 't-3';
  static themeD = 't-4';

  themes = [];

  async getThemes(){
    const themeNames = `${Theme.themeA},${Theme.themeB},${Theme.themeC},${Theme.themeD}`;
    if(this.themes.length === 0){
      this.themes = await Http.request({
        url: 'theme/by/names',
        data:{
          names: themeNames
        }
      })
    }
  }

  static getHomeLocation5Name(){
    return Theme.themeB;
  }
  static getThemeWithSpu(name){
    return Http.request({
      url: `theme/name/${name}/with_spu`
    });
  }
  getHomeLocation1(){
   const theme = this.themes.find(t => t.name === Theme.themeA);
   return theme;
  }
  getHomeLocation5(){
    return this.themes.find(t => t.name === Theme.themeB);
  }
  getHomeLocation6(){
    return this.themes.find(t => t.name === Theme.themeC);
  }
  getHomeLocation8(){
    return this.themes.find(t => t.name === Theme.themeD);
  }

}
export {
  Theme
}