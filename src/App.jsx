import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, PageNotFound } from './pages';
import { CreateEntity } from './pages/CreateEntity';
import { WarehouseView } from './pages/WarehouseView';
import { AppNav } from './components/Nav' 
import './index.css'; // Special syntax for React. This applies the CSS here and all child components


// This App file will be in charge of client side routing using react-router-dom

/**
 * React Router Dom allows us to add client-side routing to our application
 * 
 * React is used for SPAs (primarily) so react-router-dom is used to navigate between "pages" of our
 * The pages are not separate HTML documents, instead, they're prerendered HTML documents that are offscreen
 * 
 * Switching between routes just moves the other "pages" into view
 * 
 * BrowserRouter interfaces the history API in the web browser to allow us to use forward and back arrows
 * 
 * It also us to mutate the URL displayed at the top of the page such that visiting the about page looks like
 * https://www.google.com/about
 */

export const App = () => {
    return (
        // Our App component will use the BrowserRouter for everything
        <BrowserRouter>
            {/* I place the navbar here because I want it present on every page */}
            {/* Navigating between pages will carry this navbar with us */}
            {/* everything in here will be managed by the BrowserRouter */}
            <AppNav />
            <Routes>
                {/* Each route will "route" us to another "page" */}
                <Route path="/" element={<Home />} />
                <Route path="/CreateEntity" element={<CreateEntity />} />
                <Route path="/WarehouseView" element={<WarehouseView />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
            {/* Insert some footer */}
            <footer><div class="container has-text-centered">
       <p>Made by Noah Ortega. (SkillStorm 2022)</p> 
    </div></footer>
        </BrowserRouter>
    );
}

// export default App