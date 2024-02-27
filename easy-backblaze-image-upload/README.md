# Notes
This library was made specifically for sveltekit Form actions. It is not certain how it would act on a non-sveltekit app like Node.js Express. 
[Github Page](https://github.com/rainy203/easy-backblaze-image/tree/main/easy-backblaze-image-upload)

# Initialization
```bash
npm i easy-svelte-backblaze-image
```

```js
//Sveltekit form actions
import uploadB2 from "easy-svelte-backblaze-image";

```
```html

```

# uploadB2
```ts
//uploadB2 takes in 3 parameters: 
const imageLink : string = await uploadB2(file : any, applicationKey: "string", applicationKeyId: "string") 

//The applicationKey and applicationKeyId is what you would get on your Backblaze B2 bucket, make sure to make your files public.

//The uploadB2 function will return the Native URL where the image is stored. 
```
# Client side
```html
<form enctype="multipart/form-data">
<input type = "file" name = "file" accept = "image/*">
</form>
```
# Form action:
```ts

    export const actions : Actions = {
        default:  async (event) => {
            const data =  await event.request.formData()
            const file = data.get('file')
            const imageLink = await uploadB2(file, applicationKey, applicationKeyId) //returns the link

        database.save(imageLink)
        //Saves it to some database somewhere
        }
    }

```
# Limitations:
Can only upload 1 image at a time
Image only
No large files (see Backblaze file size limit for more)

