export default function ResumeSection() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">Resume</h2>
        <a
          href="/Patrick_Ruan_Resume_2026.pdf"
          download
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors"
        >
          Download PDF
        </a>
      </div>
      <iframe
        src="/Patrick_Ruan_Resume_2026.pdf"
        className="w-full rounded-lg border border-gray-200"
        style={{ height: 'min(800px, 75vh)' }}
        title="Resume"
      >
        <p className="text-gray-500 text-center py-10">
          Your browser does not support inline PDFs.{' '}
          <a href="/Patrick_Ruan_Resume_2026.pdf" className="text-blue-600 underline">
            Download the PDF
          </a>{' '}
          instead.
        </p>
      </iframe>
    </div>
  )
}
