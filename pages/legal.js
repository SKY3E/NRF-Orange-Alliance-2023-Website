export default function legal() {
  return (
    <section className="ml-4 mr-4 lg:ml-64 mt-20">
      <h1 className="text-5xl font-bold mb-2 mt-20 lg:mt-32 text-center">
        Legalities
      </h1>
      <p className="text-center mb-6">
        The terms, conditions, and privacy policy of The Ocean Scout.
      </p>
      <article className="rounded bg-white bg-opacity-50 p-2 mb-2 text-black border-2 border-gray-300">
        <h2 className="text-xl">Terms & Conditions</h2>
        <hr className="border-solid border-blue-900 border-opacity-50 border-2 mb-2 mt-1" />
        <p className="pb-2">This site is under an MIT License (MIT)</p>
        <p className="pb-2">Copyright (c) 2023 The Ocean Scout</p>
        <p className="pb-2">
          Permission is hereby granted, free of charge, to any person obtaining
          a copy of this software and associated documentation files (the
          "Software"), to deal in the Software without restriction, including
          without limitation the rights to use, copy, modify, merge, publish,
          distribute, sublicense, and/or sell copies of the Software, and to
          permit persons to whom the Software is furnished to do so, subject to
          the following conditions:
        </p>
        <p className="pb-2">
          The above copyright notice and this permission notice shall be
          included in all copies or substantial portions of the Software.
        </p>
        <p className="pb-2">
          THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
          EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
          MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
          IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
          CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
          TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
          SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
        </p>
      </article>
      <article className="rounded bg-white bg-opacity-50 p-2 mb-2 text-black border-2 border-gray-300">
        <h2 className="text-xl">Privacy Policy</h2>
        <hr className="border-solid border-blue-900 border-opacity-50 border-2 mb-2 mt-1" />
        <h3 className="text-lg">Information Collection & Use</h3>
        <p className="pb-2">
          Our service requires for you to sign in and provide us with your basic
          google account data like email, display name and profile image. This
          gives us the ability to handle data created through our service and
          associate it with your profile.
        </p>
        <p>
          All created data while logged in is associated with your profile
          meaning that any hate or agressive comments, created in the remarks
          section will directly be associated with you and will not be
          tolerated. We therefore reserve the right to suspend your account and
          ban you from access to our service if we come to the conclusion that
          you are not using the service for its intended use or for other
          reasons.
        </p>
      </article>
    </section>
  );
}
