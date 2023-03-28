const Home = () => {
    const removeStorage = () => {
        localStorage.clear();
        alert("storage removed")
    }    

    return <>
        home
        <button onClick={removeStorage}>
            reset storage
        </button>
    </>
}

export default Home;