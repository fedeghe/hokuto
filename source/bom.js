// execute function immediately if document is loaded or add it to the onload
const load = fn => {
    document.readyState === "complete"
        ? fn()
        : window.addEventListener('load', fn);
}

export default {
    load
};