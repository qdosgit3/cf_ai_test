import { useState, useEffect } from 'react';

import logo from "./assets/logo.png"; // Import the logo image

const App = () => {

    const [input_str, set_input_str] = useState("");

    const [resp_str, set_resp_str] = useState("");


    function handle_change(e: React.ChangeEvent<HTMLTextAreaElement>) {

	set_input_str(e.target.value);

    }


    function handle_confirm(e: React.MouseEvent<HTMLButtonElement>) {

        console.log("test")

    }


    return (

<div className="editor">

<div className="input">

	    <textarea className="user-input" value={input_str} onChange=
	    { (e) => { handle_change(e) } }
	    />
	    <br/>
	    <button onClick={handle_confirm}>send</button >

</div>

<div className="output">

	    <textarea className="feedback" value={resp_str} onChange=
	    { (e) => { handle_change(e) } }
	    />



</div>
</div>

    );
};

export default App;