import React from 'react'

const TrustedBrandsSection = () => {
    return (
        <section className='bg-gray-100'>
            <div className="py-20">
                <div className="container mx-auto px-6 text-center max-w-5xl">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
                        Trusted by Leading Brands
                    </h2>
                    <p className="text-gray-600 mb-8 max-w-xl mx-auto">
                        Join the ranks of our satisfied partners and clients.
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12">
                        <img
                            loading='lazy'
                            src="https://res.cloudinary.com/dqu9qfaol/image/upload/v1750151604/bravo_codpmw.png"
                            alt="Brand 1"
                            className="h-10 sm:h-36 w-auto object-contain"
                        />
                        <img
                            loading='lazy'
                            src="https://res.cloudinary.com/dqu9qfaol/image/upload/v1750151612/envato_y2tgf1.png"
                            alt="Brand 2"
                            className="h-10 sm:h-36 w-auto object-contain"
                        />
                        <img
                            loading='lazy'
                            src="https://res.cloudinary.com/dqu9qfaol/image/upload/v1750151621/habbo_oubpoc.png"
                            alt="Brand 3"
                            className="h-10 sm:h-36 w-auto object-contain"
                        />
                        <img
                            loading='lazy'
                            src="https://res.cloudinary.com/dqu9qfaol/image/upload/v1750151627/wix_krbsvb.png"
                            alt="Brand 4"
                            className="h-10 sm:h-20 w-auto object-contain"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TrustedBrandsSection
