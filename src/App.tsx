import { useState, useEffect } from 'react';

import Llm from './Llm';


import logo from "./assets/logo.png"; // Import the logo image

const App = () => {

    const [name_str, set_name_str] = useState("");

    const [input_str, set_input_str] = useState("");

    const [api_call_bool, set_api_call_bool] = useState(false);
    
    const [llm_resp, set_llm_resp] = useState("");


    function handle_name_change(e: React.ChangeEvent<HTMLTextAreaElement>) {

	set_name_str(e.target.value);

    }

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

<div>

<h1>Eliza v2</h1>

<div className="editor">

<div className="input">

	Please provide your name:

	    <textarea className="name" value={name_str} onChange=
	    { (e) => { handle_name_change(e) } }
	    />

Please provide your message:

	    <textarea className="user-input" value={input_str} onChange=
	    { (e) => { handle_change(e) } }
	    />
	    <br/>


	    {api_call_bool? null : <button onClick={handle_confirm}>send</button >}

</div>

<div className="output">

	    <Llm
	name_str={name_str}
	input_str={input_str}
	api_call_bool={api_call_bool}
	set_api_call_bool={set_api_call_bool}
	llm_resp={llm_resp}
	set_llm_resp={set_llm_resp}
	    />

</div>
</div>

</div>

    );
};

export default App;