import { Helmet } from 'react-helmet-async'
import AddPlantForm from '../../../components/Form/AddPlantForm'
import { imageUpload } from '../../../api/utils';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
const AddPlant = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  // const [uploadButtonText, setUploadButtonText] = useState({ name: 'Upload Image' });
  const [uploadImage, setUploadImage] = useState({
    image: { name: 'Upload Button' },
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true)
    const form = e.target;
    const name = form.name.value;
    const description = form.description.value;
    const category = form.category.value;
    const price = parseFloat(form.price.value);
    const quantity = parseFloat(form.quantity.value);
    const image = form.image.files[0];
    const imageUrl = await imageUpload(image);

    // seller info
    const seller = {
      name: user?.displayName,
      image: user?.photoURL,
      email: user?.email,
    }
    const plantData = {
      name, description, category, price, quantity, image: imageUrl, seller
    }
    // console.table(plantData);
    try {
      await axiosSecure.post('/plants', plantData)
      toast.success('Data added successfully!')
      form.reset();
      navigate('/')
    } catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false)
    }
  }
  return (
    <div>
      <Helmet>
        <title>Add Plant | Dashboard</title>
      </Helmet>

      {/* Form */}
      <AddPlantForm
        handleSubmit={handleSubmit}
        // uploadButtonText={uploadButtonText}
        // setUploadButtonText={setUploadButtonText}
        uploadImage={uploadImage}
        setUploadImage={setUploadImage}
        loading={loading}
      />
    </div>
  )
}

export default AddPlant
