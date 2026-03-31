don't run app when not visible
function App() {
const isVisible = usePageVisibility(); // Custom hook using document.visibilityState

if (!isVisible) {
return null; // This unmounts the entire UI, clearing images and listeners
}

return <Dashboard />;
}

languages need to be rethought cause they are huge, but are never used + are mostly untranslated

image resolution is fucked
