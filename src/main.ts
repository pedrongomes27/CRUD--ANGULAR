import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'; //Essa função é usada para inicializar a plataforma do Angular no navegador
import { AppModule } from './app/app.module'; //Contém a definição dos componentes, serviços e outros recursos da aplicação

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(erro => console.error(erro));