import NavigationBar from './components/navigation-bar/navigation-bar.js';

const navigationItems = [
    {
        url: 'hello-world-page',
        title: 'Hello World Page'
    },
    {
        url: 'butterfly-page',
        title: 'Butterfly Page'
    },
];

const navigationBar = new NavigationBar();
navigationBar.render(navigationItems);

const url = window.location.pathname;
// Component depending on URL that why need to load url first  

// Now we need torender helloworld page on one url and butterfly page on another url
if(url === '/hello-world-page') {
    import('HelloWorldApp/HelloWorldPage').then(HelloWorldPageModule => {
        // get the page from default export
        const HelloWorldPage = HelloWorldPageModule.default;
        const helloWorldPage = new HelloWorldPage();
        helloWorldPage.render();
    });
} else if(url === '/butterfly-page') {
    import('ButterflyApp/ButterflyPage').then(ButterflyPageModule => {
        const ButterflyPage = ButterflyPageModule.default;
        const butterflyPage = new ButterflyPage();
        butterflyPage.render();
    });
}

// Need to import dynamically bec. bundle are loaded async.
// Import Federated module from webpack and render the page.
// Create express server to serve app in to browser