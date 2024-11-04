import os

def open_file(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            file_content = f.read()
    except FileNotFoundError:
        print(f"Error: Could not find file {sdk_path}")
        return False
    except Exception as e:
        print(f"Error reading {sdk_path}: {str(e)}")
        return False
    
    return file_content

def combine_md_files(sdk_path, list_path, output_path, important_path, api_key):
    # Read the first file

    sdk_content = open_file(sdk_path)
    list_content = open_file(list_path)
    important_content = open_file(important_path)
    
    if sdk_content is False: raise Exception("Error SDK CONTENT files")
    if list_content is False: raise Exception("Error LIST CONTENT files")
    if important_content is False: raise Exception("Error IMPORTANT CONTENT files")
    
    combined_content = important_content + "\n\n" + sdk_content + "\n\n" + list_content + important_content

    combined_content = combined_content.replace(
        "process.env.REACT_APP_ALPHA_AVATAR_API_KEY", 
        f'"{api_key}"'
    )

    try:
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(combined_content)
        print(f"Successfully created combined file at {output_path}")
        return True
    except Exception as e:
        print(f"Error writing to {output_path}: {str(e)}")
        return False

# Example usage
if __name__ == "__main__":
    sdk_path = "/Users/andrewwiskus/dev/alpha-ai-avatar-sdk-aipi-cursor/aipi/avatar_sdk.md"
    list_path = "/Users/andrewwiskus/dev/alpha-ai-avatar-sdk-aipi-cursor/aipi/avatar_list.md"
    important_path = "/Users/andrewwiskus/dev/alpha-ai-avatar-sdk-aipi-cursor/aipi/avatar_important_rules.md"  # You can modify this path
    output_path = "/Users/andrewwiskus/dev/alpha-ai-avatar-sdk-aipi-cursor/aipi/combined_output.txt"  # You can modify this path as needed
    api_key = "s76hu0jzWThfnscn"  # Replace with your actual API key
    
    combine_md_files(sdk_path, list_path, output_path, important_path, api_key)