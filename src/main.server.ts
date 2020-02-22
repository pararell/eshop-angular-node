import { enableProdMode } from '@angular/core';

export { AppServerModule } from './app/app.server.module';

enableProdMode();

export { renderModule, renderModuleFactory } from '@angular/platform-server';