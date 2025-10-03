import React from 'react'
import Link from 'next/link'
const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 z-0 py-10">
            {/* Payment Logos */}
            <div className="container mx-auto flex flex-nowrap sm:flex-wrap justify-center items-center gap-4 sm:gap-8 border-b border-gray-700 pb-6 overflow-x-auto">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                    alt="Paypal"
                    className="h-6"
                />
                <img src="/visa.svg" alt="Visa" className="h-6" />
                <p className="flex items-center gap-1">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                        alt="Mastercard"
                        className="h-6 sm:h-8"
                    />
                    <span className="text-sm sm:text-base">Mastercard</span>
                </p>
            </div>


            {/* Footer Links */}
            <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 mt-8">
                {/* Company */}
                <div className='pl-5' >
                    <h3 className="text-white font-semibold mb-3">Quick Links</h3>
                    <ul className="space-y-2">
                        <li className="hover:text-white hover:underline" ><Link href="/about-Us">About Us</Link></li>
                        <li className="hover:text-white hover:underline" ><Link href="/products">Shop</Link></li>
                        <li className="hover:text-white hover:underline" ><Link href="/collections">Shop by category</Link></li>
                        <li className="hover:text-white hover:underline" ><Link href="/contact">Contact Us</Link></li>
                        <li className="hover:text-white hover:underline" ><Link href="/faqs">FAQs</Link></li>

                    </ul>
                </div>

                {/* Payment Methods */}
                <div>
                    <h3 className="text-white font-semibold mb-3">PAYMENT METHODS</h3>
                    <ul className="space-y-2">
                        <li>Visa & Mastercard</li>
                        <li>Amex Card</li>
                        <li>Gift Cards</li>
                        <li>Crypto</li>
                    </ul>
                </div>

                {/* Help Center */}
                <div className='relative sm:left-0 left-2 ' >
                    <h3 className="text-white font-semibold mb-3">Customer Service / Support</h3>
                    <ul className="space-y-2">
                        <li className="hover:text-white hover:underline" ><Link href="/return-&-exchanges">Returns & Exchanges</Link></li>
                        <li className="hover:text-white hover:underline" ><Link href="/shipping-info">Shipping Information</Link></li>
                        <li className="hover:text-white hover:underline" ><Link href="/payment-options">Payment Options / COD</Link></li>
                        <li className="hover:text-white hover:underline" ><Link href="/terms-&-conditions">Terms & Conditions</Link></li>
                        <li className="hover:text-white hover:underline" ><Link href="/privacy-policy">Privacy Policy</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-white font-semibold mb-4 text-lg tracking-wide">
                        Social Links
                    </h3>
                    <ul className="space-y-3">
                        {/* Instagram */}
                        <li>
                            <Link
                                target="_blank"
                                href="https://www.instagram.com/ardsuhail"
                                className="flex items-center gap-3 hover:text-pink-400 hover:underline transition-all duration-300"
                            >
                                <img src="https://static.vecteezy.com/system/resources/previews/018/930/415/non_2x/instagram-logo-instagram-icon-transparent-free-png.png" alt="Instagram" className="w-5 h-5" />
                                Instagram
                            </Link>
                        </li>

                        {/* GitHub */}
                        <li>
                            <Link
                                target="_blank"
                                href="https://github.com/suhail134"
                                className="flex items-center gap-3 hover:text-gray-300 hover:underline transition-all duration-300"
                            >
                                <img src="/github.svg" alt="GitHub" className="w-5 h-5" />
                                GitHub
                            </Link>
                        </li>

                        {/* Facebook */}
                        <li>
                            <Link
                                target="_blank"
                                href="https://www.facebook.com/ardsuhail"
                                className="flex items-center gap-3 hover:text-blue-400 hover:underline transition-all duration-300"
                            >
                                <img src="/facebook.svg" alt="Facebook" className="w-5 h-5" />
                                Facebook
                            </Link>
                        </li>
                    </ul>
                </div>

            </div>

            {/* Copyright */}
            <div className="container mx-auto text-center border-t border-gray-700 mt-10 pt-5 text-sm">
                © 2025 Shopovix Store. All Rights Reserved.
            </div>
        </footer>
    )
}

export default Footer
