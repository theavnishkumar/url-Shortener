import React from 'react'

const Stats = () => {
  return (
    <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <p className="text-4xl font-bold text-indigo-600 mb-2">100+</p>
                <p className="text-gray-500">URLs Shortened</p>
              </div>

              <div className="text-center">
                <p className="text-4xl font-bold text-indigo-600 mb-2">10K+</p>
                <p className="text-gray-500">Monthly Clicks</p>
              </div>

              <div className="text-center">
                <p className="text-4xl font-bold text-indigo-600 mb-2">100+</p>
                <p className="text-gray-500">Happy Users</p>
              </div>
            </div>
          </div>
        </section>
  )
}

export default Stats
