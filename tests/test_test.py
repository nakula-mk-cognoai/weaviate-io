import subprocess
import pytest
import utils
import shlex
import os
import json


@pytest.mark.ts3
@pytest.mark.parametrize(
    "script_loc",
    [
        "./_includes/code/howto/search.basics.ts",
    ],
)
def test_on_blank_instance_ts(empty_weaviates, script_loc):
    temp_proc_script_loc = utils.load_and_prep_temp_file(script_loc, lang="ts")

    ts_compiler_options = {
        "target": "esnext",
        "module": "esnext",
        "moduleResolution": "node16",
        "lib": ["es2018"]
    }

    # Convert compiler options to a JSON string to pass to ts-node
    options_json = json.dumps(ts_compiler_options)

    command = [
        "node",
        "--loader=ts-node/esm",
        "--experimental-specifier-resolution=node",
        temp_proc_script_loc,
        "-O", options_json
    ]

    try:
        # If the script throws an error, this will raise a CalledProcessError
        subprocess.check_call(command)
    except subprocess.CalledProcessError as error:
        pytest.fail(f'Script {temp_proc_script_loc} failed with error: {error}')
