
import React, { useState, Dispatch, SetStateAction } from 'react';


interface LlmProps {

	  input_str: string;

  api_call_bool: boolean;                            // The state value
  
  set_api_call_bool: Dispatch<SetStateAction<boolean>>; // The state setter
  
  llm_resp: string;                            // The state value
  
  set_llm_resp: Dispatch<SetStateAction<string>>; // The state setter
  
}


const Llm = ({ input_str, api_call_bool, set_api_call_bool, llm_resp, set_llm_resp }: LlmProps) => {

    function handle_change(e: React.ChangeEvent<HTMLTextAreaElement>) {

    console.log('a');	     

    }

    if (api_call_bool === false) {
	
        return (
            <>
            <em>Current status:...</em>
            <br/>
            <br/>
            {llm_resp}
            </>
        )
	
    } else {
	
	    call_llm(input_str, llm_resp, set_llm_resp, set_api_call_bool);

	    return (
		    <div className="loading">Calling Llama 3.1 API</div>
	    )

    }
	
};


export default Llm;

export async function call_llm(llm_req: string, llm_resp: string, set_llm_resp: Dispatch<SetStateAction<string>>, set_api_call_bool: Dispatch<SetStateAction<boolean>>) {

    const llm_json = await fetch_with_retries(llm_req, 0);

    store_data(llm_req, llm_json, llm_resp, set_llm_resp);

    set_api_call_bool(false);

};


async function fetch_with_retries(llm_req: string, retry_count: number) {


    const ACCOUNT_ID = 'bfb0cd0115e98f74e4b00c41c72bac60';
    const API_TOKEN = 'gWxIKxQKCF4JDg5dpkv80hW9qBhLz1PNjpd03IDF';

    const url = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/ai/run/@cf/meta/llama-3.1-8b-instruct-fast`;
      
    console.log(url);

    try {

        req = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json'
        },
    body: JSON.stringify({
    "messages": [
        {
            "role":"system",
            "content":"You are a friendly assistant that helps write stories"
        },
        {
            "role":"user",
            "content":"Write a short story about a llama that goes on a journey to find an orange cloud "
        }
        ]
      })
    }

    console.log("sending22")

    console.log(req)
	
    return await fetch(url, req).then(res => res.json());

    } catch (error) {

    console.log("retrying fetch(), retry_count");

    if (retry_count < 3) {

    return fetch_with_retries(llm_req, retry_count + 1);

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

	set_llm_resp(JSON.stringify(llm_json));

    } catch {

    }

};