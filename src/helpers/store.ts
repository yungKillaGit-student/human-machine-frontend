import store from "store";
import observePlugin from "store/plugins/observe";

store.addPlugin(observePlugin);

interface CustomStore extends StoreJsAPI {
  observe: (key: string, callback?: Function) => void;
}

export default store as CustomStore;
