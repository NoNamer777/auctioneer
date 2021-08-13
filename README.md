# Auctioneer

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) v12.1.2.
It uses Bootstrap and additional Font Awesome icons.

## Package manager

This project uses Yarn to manage packages.
To use that, install it first locally by running `npm install --global yarn` in the console.

Let Angular know to use Yarn by default by running `ng config --global cli.packageManaer yarn` in the console.
This way Angular will use Yarn when running any `ng <command>` command in the console.

## Development server

Run `yarn run start:local` for a dev server.
Run `yarn run start:remote` for a dev server that is available within your local network. Be sure to check your device's IP configuration first before running the script and change the targetted host accordingly, otherwise you'll maybe run into errors stating that the provided address is not available.

You'll also need to update the `src/environments/environment.dev.ts` to your needs. You can find an example in the `src/environments/environment.ts`.

The app will automatically reload if you change any of the source files.

## Testing

Run `yarn run test:dev` to run the unit tests of your code.
The tests need to provide testing coverage for statements, branches, functions, and lines of at least 80%.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.
