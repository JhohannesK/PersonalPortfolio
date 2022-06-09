import React from 'react'

const TechStack = () => {
    return (
        <div>
            <section className='text-3xl pt-5 sm:flex sm:items-center justify-center gap-x-5 font-Source-code'>
                {/* Languages */}
                <div className=''>
                    <p>
                        <span className='text-purple-700'>let</span> <span className='text-red-600'>languages</span> = [
                    </p>
                    <pre className='pl-12 text-yellow-400'>
                        <ul>
                            <li>Python</li>
                            <li>JavaScript</li>
                            <li>Java</li>
                        </ul>
                    </pre>
                </div>

                {/* Frameworks */}
                <div>
                    <p>
                        <span className='text-purple-700'>let</span> frameworks = [
                    </p>
                </div>
            </section>
        </div>
    )
}

export default TechStack
