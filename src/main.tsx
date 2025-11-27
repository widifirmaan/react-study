import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "swiper/swiper-bundle.css";
import "flatpickr/dist/flatpickr.css";
import App from "./App";
import { AppWrapper } from "./components/common/PageMeta";
import { Provider } from 'react-redux';
import { store } from './components/common/store';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <AppWrapper>
        <App />
      </AppWrapper>
    </Provider>
  </StrictMode>,
);
