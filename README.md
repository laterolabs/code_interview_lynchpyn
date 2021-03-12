# README

## Setup

This project uses a rails backend and a react / mobx-state-tree front end.
For details on rails:

- https://guides.rubyonrails.org/
  For details on mobx-state-tree:
- https://mobx-state-tree.js.org/intro/welcome
- https://github.com/mobxjs/mobx-state-tree

If you need to set up ruby:

- To run this you will need to ensure you have the right version of ruby installed (2.6.5), it may be useful to install rbenv to manage your ruby version (https://github.com/rbenv/rbenv)
- Once it has been installed you can run 'gem install bundler' to ensure you can download all the gems for the project.

If you need to set up node:

- To run this you will want node 12.x or higher. It may be useful to install n to manage your node version. (https://github.com/tj/n)
- Once installed you can run 'yarn' to install the packages required.

If you are on a windows environment you may want to use a virtual machine:

- https://gorails.com/guides/using-vagrant-for-rails-development

The sample project uses sql lite which should not require other dependencies. You will need the following steps to set up the project in terminal:

```
bundle install
yarn
bundle exec rails db:create db:migrate
bundle exec raild db:seed
```

Once that is complete, you can run the app by startng the rails app:

```
bundle exec rails s
```

For hot reloading, it would be best to run webpacker in a separate window:

```
bin/webpack-dev-server
```

Now if you go to localhost:3000 you should be off to the races.

## Assignment Details
