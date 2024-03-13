import React from 'react';

function Articles({ fetchData }) {
    

    return (
        <div>
            {fetchData.map((data) => {
                return (
                    <div key={data.idarticle} className='flex justify-between text-white'>
                        <div className='flex justify-betwenn'>
                            <p>{data.title}</p>
                            <p>{data.content}</p>
                        </div>
                        <div className='flex justify-between text-white'>
                            {data.articlepdf ? <embed src={data.articlepdf} type="application/pdf" /> : null}
                            <img src={data.articleimage} alt="image" />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Articles;
