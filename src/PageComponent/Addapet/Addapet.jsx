import { useContext, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Select from 'react-select';
import { Button } from '@material-tailwind/react';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const petCategories = [
  { value: 'dog', label: 'Dog' },
  { value: 'cat', label: 'Cat' },
  { value: 'bird', label: 'Bird' },
  { value: 'other', label: 'Other' },
];

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Addapet = () => {
    const {user}=useContext(AuthContext)

  const [imageUrl, setImageUrl] = useState('');
  

  const initialValues = {
    petName: '',
    petAge: '',
    petCategory: '',
    petLocation: '',
    shortDescription: '',
    longDescription: '',
    adopted: false,
  };

  const validationSchema = Yup.object({
    petName: Yup.string().required('Pet name is required'),
    petAge: Yup.number().required('Pet age is required').positive('Age must be positive').integer('Age must be an integer'),
    petCategory: Yup.string().required('Pet category is required'),
    petLocation: Yup.string().required('Pet location is required'),
    shortDescription: Yup.string().required('Short description is required'),
    longDescription: Yup.string().required('Long description is required'),
  });

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    
      const res = await axios.post(image_hosting_api, formData);
      setImageUrl(res.data.data.url);
    
  };

  const onSubmit = async (values) => {
   const email = user ? user.email : "Unknown";
        const userName = user ? user.displayName : "Unknown";
        const photoURL = user ? user?.photoURL : "Unknown";
      const petData = {
        ...values,
        petImage: imageUrl,
        email:email,
        userName:userName,
        photoURL:photoURL,

        addedDate: new Date().toISOString(),
      };

      const addpet = await axios.post('http://localhost:5000/petlisting', petData);
      console.log(addpet.data)
      alert('Pet added successfully!');
    // } catch (error) {
    //   console.error('Error adding pet:', error);
    //   setFieldError('general', 'Failed to add pet. Please try again.');
    // } finally {
    //   setSubmitting(false);
    // }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ setFieldValue, isSubmitting, errors }) => (
        <Form className='m-4 border p-2 '>
          <div>
            <label htmlFor="petImage">Pet Image :</label>
            <input
              className='p-2'
              id="petImage"
              name="petImage"
              type="file"
              onChange={(event) => {
                handleImageUpload(event.currentTarget.files[0]);
              }}
            />
            {imageUrl && <img src={imageUrl} alt="Pet" width="100" />}
          </div>

          <div className='mt-4'>
            <label htmlFor="petName">Pet Name:</label>
            <Field className="border border-black rounded-sm px-2 m-2" id="petName" name="petName" placeholder="Pet Name" />
            <ErrorMessage className='text-red-500' name="petName" component="div" />
          </div>

          <div>
            <label htmlFor="petAge">Pet Age :</label>
            <Field className="border border-black rounded-sm px-2 m-2" id="petAge" name="petAge" placeholder="Pet Age" />
            <ErrorMessage className='text-red-500' name="petAge" component="div" />
          </div>

          <div className='w-1/2'>
            <label htmlFor="petCategory">Pet Category</label>
            <Select
              id="petCategory"
              options={petCategories}
              onChange={(option) => setFieldValue('petCategory', option.value)}
            />
            <ErrorMessage className='text-red-500' name="petCategory" component="div" />
          </div>

          <div>
            <label htmlFor="petLocation">Pet Location</label>
            <Field className="border border-black rounded-sm px-2 m-2" id="petLocation" name="petLocation" placeholder="Pet Location" />
            <ErrorMessage className='text-red-500' name="petLocation" component="div" />
          </div>

          <div>
            <label htmlFor="shortDescription">Short Description</label>
            <Field className="border border-black rounded-sm px-2 m-2" id="shortDescription" name="shortDescription" placeholder="Short Description" />
            <ErrorMessage className='text-red-500' name="shortDescription" component="div" />
          </div>

          <div className='items-center'>
            <label htmlFor="longDescription">Long Description :</label>
            <Field className="border border-black rounded-sm px-2 m-2 mt-4" id="longDescription" name="longDescription" as="textarea" placeholder="Long Description" />
            <ErrorMessage className='text-red-500' name="longDescription" component="div" />
          </div>

          <div>
            <Button type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </div>

          {errors.general && <div className='text-red-500'>{errors.general}</div>}
        </Form>
      )}
    </Formik>
  );
};

export default Addapet;
