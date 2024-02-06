import React, { useState, useEffect } from 'react';

export type IArticle = {
    _id: string;
    title: string;
    body: string;
    image: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
const Articles = () => {
    const [articles, setArticles] = useState<IArticle[]>([]);

    const getAllArticles = () => {
        fetch('')
            .then(response => response.json())
            .then(data => setArticles(data))
            .catch(error => console.log(error));
    }

    useEffect(() => {
        getAllArticles();
    }, []);

    return (
        <div>
            {
                articles.map((item) => (
                    <div key={item._id}>
                        <h2>{item.title}</h2>
                        <p>{item.body}</p>
                        <img src={item.image} alt={item.title} />
                    </div>
                ))
            }
        </div>
    )
};

export default Articles;