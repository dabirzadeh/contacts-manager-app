const PreLoader = () => {
    return (
        <>
            <div className="pre-loader">
                <img className="d-block mx-auto" src={require("../assets/spinner.gif")} alt="" style={{width: "200px"}}/>
            </div>
        </>
    );
}

export default PreLoader;