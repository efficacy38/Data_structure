import React from 'react'

function Article({match}) {

    return (
        <div>
            {`this is article ${match.params.id}`}
        </div>
    )
}

export default Article
