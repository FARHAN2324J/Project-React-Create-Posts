import { useState } from "react";
import './post.css';

const Post = () => {
    const [image, setImage] = useState(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [step, setStep] = useState(1);
    const [posts, setPosts] = useState([]); // State جدید برای ذخیره پست‌ها

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleNext = () => {
        if (step === 1 && image) {
            setStep(2);
        } else if (step === 2) {
            setStep(3);
        }
    };

    const handleSubmit = () => {
        const newPost = {
            name: name,
            description: description,
            image: image
        };
        setPosts([...posts, newPost]); // اضافه کردن پست جدید به لیست پست‌ها
        // Reset the form fields
        setName("");
        setDescription("");
        setImage(null);
        setStep(1); // بازگشت به مرحله اول
    };

    const handleDelete = () => {
        // Reset the form fields
        setName("");
        setDescription("");
        setImage(null);
        setStep(1); // بازگشت به مرحله اول
    };

    return (
        <div className="container-post">
            {step === 1 && (
                <div>
                    <div className="container-create">
                        <div className="container-label-input-button">
                            <div className="container-label-input">
                                <label htmlFor="file-upload" class="file-upload-label">Choose file</label>
                                <input type="file" accept="image/*" className="input-file" id="file-upload" onChange={handleFileChange} />
                            </div>
                            <div className="container-button">
                                <button onClick={handleNext}>Next</button>
                            </div>
                        </div>
                        {image && (
                        <div className="img-create">
                            <img src={image} alt="Uploaded" />
                        </div>
                        )}
                    </div>
                </div>
            )}

            {step === 2 && (
                <div>
                    <div className="container-content">
                        <input 
                            type="text" 
                            placeholder="Add location" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                        /> <i style={{color: '#797979'}} className="fas fa-map-marker-alt"></i>
                        <textarea 
                        placeholder="Enter description" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        />
                        <button onClick={handleNext}>Next</button>
                    </div>
                    {image && (
                        <div className="img-create">
                            <img src={image} alt="Uploaded" />
                        </div>
                        )}
                </div>
            )}

            {step === 3 && (
                <div>
                    <h2>Your Post</h2>
                    <img src={image} alt="Uploaded" style={{ width: '50%' }} />
                    <p><strong>Location: </strong> {name}</p>
                    <p><strong>description: </strong> {description}</p>
                    <button onClick={handleSubmit}>Submit</button>
                    <button onClick={handleDelete} style={{ marginLeft: '10px' }}>Delete</button> {/* دکمه حذف */}
                </div>
            )}
            
            {/* نمایش پست‌ها */}
            <div className="posts-container">
                <div className="grid">
                        {posts.map((post, index) => (
                    <div key={index} className="post">
                        {post.image && <img src={post.image} alt="Uploaded"  />}
                        <h3 style={{padding: '5px'}}>Location: {post.name}</h3>
                        <p style={{padding: '5px'}}>Description: {post.description}</p>
                    </div>
                    ))}   
                    </div>
                </div>
        </div>
    );
};

export default Post;
