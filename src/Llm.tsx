
import React, { useState, Dispatch, SetStateAction } from 'react';


interface LlmProps {

	  name_str: string;

	  input_str: string;

  api_call_bool: boolean;                            // The state value
  
  set_api_call_bool: Dispatch<SetStateAction<boolean>>; // The state setter
  
  llm_resp: string;                            // The state value
  
  set_llm_resp: Dispatch<SetStateAction<string>>; // The state setter
  
}


const Llm = ({ name_str, input_str, api_call_bool, set_api_call_bool, llm_resp, set_llm_resp }: LlmProps) => {

    function handle_change(e: React.ChangeEvent<HTMLTextAreaElement>) {

    console.log('a');	     

    }

    if (api_call_bool === false) {
	
        return (
            <>
            <em>Psycologist's response:</em>
            <br/>
            <br/>
            {llm_resp}
            </>
        )
	
    } else {
	
	    call_llm(name_str, input_str, llm_resp, set_llm_resp, set_api_call_bool);

	    return (
		    <div className="loading">Calling Llama 3.1 API via Cloudflare</div>
	    )

    }
	
};


export default Llm;

export async function call_llm(name: string, llm_req: string, llm_resp: string, set_llm_resp: Dispatch<SetStateAction<string>>, set_api_call_bool: Dispatch<SetStateAction<boolean>>) {


    const llm_json = await fetch_with_retries(name, llm_req, 0);

    store_data(llm_req, llm_json, llm_resp, set_llm_resp);

    console.log(llm_resp)
    
    set_api_call_bool(false);

};


async function fetch_with_retries(name: string, llm_req: string, retry_count: number) {

    const url = "https://hello-ai.qdosgit3.workers.dev/"
      
    try {

        const req = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
	username: name,
        prompt: llm_req })
        }

        console.log(req)
	
        return await fetch(url, req).then(res => res.json());

    } catch (error) {

        console.log("retrying fetch(), retry_count");

        if (retry_count < 3) {

	    return fetch_with_retries(name, llm_req, retry_count + 1);

    	} else {

	    return JSON.stringify({
	    status: false
	    })

	}

    }
    
};


export function store_data(llm_req: string, llm_json: Record<string, string>, llm_resp: string, set_llm_resp: Dispatch<SetStateAction<string>>) {
    
    console.log("store_data()", JSON.stringify(llm_json))

    try {
	
	// const top_hit_coords = llm_json.features[0].geometry.coordinates;

	// const source_obj = {
	//     'postcode': postcode,
	//     'longitude': top_hit_coords[0],
	//     'latitude': top_hit_coords[1],
	//     'borough': borough
	// };

	console.log(JSON.stringify(llm_json));

	set_llm_resp(llm_json["response"]);

    } catch {

    }

};