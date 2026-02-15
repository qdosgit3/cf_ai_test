import { useState, useEffect } from 'react';

import Llm from './Llm';


import logo from "./assets/logo.png"; // Import the logo image

const App = () => {

    const [input_str, set_input_str] = useState("");

    const [api_call_bool, set_api_call_bool] = useState(false);
    
    const [llm_resp, set_llm_resp] = useState("");


    function handle_change(e: React.ChangeEvent<HTMLTextAreaElement>) {

	set_input_str(e.target.value);

    }


    function handle_confirm(e: React.MouseEvent<HTMLButtonElement>) {

        console.log("test")

	    	     set_api_call_bool(true);			    

    }


    useEffect(() => {

    	if (llm_resp) {

    	    console.log('hello');

    	}

    }, [llm_resp]);




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

	    <Llm
	input_str={input_str}
	api_call_bool={api_call_bool}
	set_api_call_bool={set_api_call_bool}
	llm_resp={llm_resp}
	set_llm_resp={set_llm_resp}
	    />



</div>
</div>

    );
};

export default App;