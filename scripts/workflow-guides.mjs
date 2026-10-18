export const additionalWorkflowGuides = [
  {
    slug: 'prepare-document-upload', topic: 'PaperAid · Documents',
    title: 'Prepare a readable document for an upload limit',
    description: 'A worked PaperAid workflow for cropping a scan, checking page order and reducing file size without losing readable text.',
    datePublished: '2026-10-18',
    body: `<p>An upload portal can reject a document even when it looks fine in a phone gallery. It may require a particular file type, a maximum size and readable pages in a specific order. This guide uses a fictional application asking for a PDF smaller than 1 MB. The example is a workflow, not a rule for any government or passport service. Read your actual portal's requirements first.</p>
<h2 id="requirements">Write down the receiving requirements</h2>
<p>Record the accepted format, size limit, page count and whether several documents must be submitted separately. A photo size in pixels and a file size in KB describe different things. Likewise, a PDF upload limit says nothing about how many pages the receiver expects. Keep a copy of the original scan so a failed export does not leave you without a readable source.</p>
<p>Install <a href="https://play.google.com/store/apps/details?id=com.baishalya.paperaid">PaperAid from Google Play</a> on Android or use its <a href="https://apps.microsoft.com/detail/9PC123WB2SDH">Microsoft Store listing</a> on Windows. Both platforms are publicly released. Android can capture with the camera; on Windows, select the source images. The <a href="/paperaid/manual.html">manual</a> covers the current tool controls.</p>
<h2 id="capture">Make the source readable before compressing</h2>
<p>For the fictional two-page application, place each sheet flat under even light. Keep fingers, reflections and heavy shadows out of the text. Capture the whole page, then crop to its edges without removing a signature, page number or stamp. If small writing is blurred in the source, recapture it. Compression cannot reconstruct missing detail.</p>
<p>In Scan document, choose the appropriate color or cleanup treatment and review fine text. A black-and-white style can help some printed forms but may remove faint marks or color information that matters. Choose the version that preserves the required information rather than assuming stronger cleanup is always better.</p>
<h2 id="assemble">Build one PDF in the intended order</h2>
<p>Use Photo to PDF when combining existing images. Arrange the pages so the first application page appears before the signature page, choose the intended page size and export a new PDF. Give it a recognizable name such as <code>example-application-reviewed.pdf</code>. The name should help you select the right file later; avoid including unnecessary personal identifiers.</p>
<p>Open the exported PDF in another viewer. Check the number of pages, orientation and order. Read small text at normal viewing size, then inspect signatures and page edges. A successful save only establishes that a file was written; this review establishes whether the intended information survived.</p>
<h2 id="size">Reduce size only as far as the task needs</h2>
<p>If the PDF is over the fictional 1 MB limit, use a PDF size-reduction tool on a copy. Check the actual saved byte size rather than relying on a filename or an estimated target. A portal may interpret its limit differently, so leave some room below the maximum. Compare the reduced copy against the original, especially small print and light handwriting.</p>
<div class="table-wrap"><table><thead><tr><th>What you see</th><th>Next check</th></tr></thead><tbody><tr><td>PDF is still too large</td><td>Check for duplicate pages or oversized source images; try another copy with appropriate reduction.</td></tr><tr><td>Text becomes blocky</td><td>Return to the better source or use less aggressive reduction.</td></tr><tr><td>Portal accepts images only</td><td>Use the required image format and check its dimensions and byte size separately.</td></tr><tr><td>PDF opens but upload fails</td><td>Compare the actual format, size, page count and password restrictions with the portal's current instructions.</td></tr></tbody></table></div>
<h2 id="submit">Review the exact file you will submit</h2>
<p>Select the reviewed copy, then use the portal's preview where available to confirm it is the intended document. Keep the original and the final copy until the receiving process is complete. Do not delete the source merely because the upload button reported success.</p>
<p>For an ID-photo submission, separately verify the receiving authority's current framing, dimensions and background rules. A PaperAid preset helps prepare an image; it does not guarantee acceptance. For product help, use <a href="/paperaid/support.html">PaperAid support</a> and include the platform, app version, operation and error message without attaching a private document by default.</p>`,
  },
  {
    slug: 'debug-api-request', topic: 'DevDesk · API testing',
    title: 'Debug an API request with a small reproducible example',
    description: 'Use a fictional customer request to check JSON, URL encoding, identifiers and timestamps, then save a sanitized example in DevDesk.',
    datePublished: '2026-10-18',
    body: `<p>A failed API request is easier to investigate when its inputs are small and its expected result is clear. This walkthrough uses fictional customer data and a documentation-only <code>example.com</code> address. It does not call a live service or require a real token. Replace the destination only with an endpoint you are authorized to test and follow that API's contract.</p>
<h2 id="scope">Keep the example with its project</h2>
<p>Open the relevant DevDesk workspace and use <a href="/devdesk/manual/api-workspaces.html">Saved API testing</a> for the request. Record the method, endpoint, required headers and expected response in a note next to the project. Distinguish an expectation taken from the API documentation from a result you actually observed.</p>
<p>Start with the smallest body that reproduces the problem. The <a href="/guides/examples/customer-request.json" download>fictional customer fixture</a> contains an identifier, a display name and a timestamp. It is a JSON body, not an automatically executable request or a DevDesk workspace export:</p>
<pre>{
  "id": "8b7b50db-2a87-4fd7-a20f-1b7ff6cbd56c",
  "displayName": "Example Customer",
  "createdAtSeconds": 1704067200
}</pre>
<h2 id="body">Check the body before the network</h2>
<p>Use JSON Tools to validate and format the sample. A trailing comma or an unquoted property name is a syntax issue; a valid JSON number in a field that requires a string is a contract issue. Formatting helps reveal structure but cannot decide whether the receiving API accepts the field names and values.</p>
<p>The <a href="/devdesk/manual/uuid.html">UUID guide</a> explains how to generate a distinct fictional identifier. Keep the same identifier when testing an update to one record. A newly generated value can accidentally turn an update investigation into a new-record test. Do not reuse the example ID as a real credential.</p>
<h2 id="url">Check URL values separately</h2>
<p>If a search value contains <code>site report &amp; photos</code>, its component-encoded representation is <code>site%20report%20%26%20photos</code>. Preserve the URL structure around it. Encoding an entire already-built URL can change separators; encoding a value twice can introduce <code>%25</code> sequences. See <a href="/devdesk/manual/url-tools.html">URL Encoder and Decoder</a> for the round trip.</p>
<p>Also compare development and production hosts, API versions and path parameters. A correctly encoded value sent to the wrong environment is still the wrong request. Use a supported protected variable for credentials, and review the final resolved request before sending it.</p>
<h2 id="time">Make time and authentication checks explicit</h2>
<p>The sample's <code>1704067200</code> represents 1 January 2024 at 00:00 UTC when interpreted as Unix seconds. The millisecond representation is <code>1704067200000</code>. Use the <a href="/devdesk/manual/timestamp.html">Timestamp Converter</a> to compare the required unit and display zone. Changing the display zone should not change the instant stored by the API.</p>
<p>If authentication fails, inspect only a synthetic or authorized development token locally. The <a href="/devdesk/manual/jwt-decoder.html">JWT Decoder</a> makes claims readable; signature validation, accepted issuer, audience and expiry checks still belong to the receiving system. Avoid copying a production token into a public bug report.</p>
<h2 id="record">Record one observed result at a time</h2>
<p>When you run an authorized test, record the response status, relevant response fields and the one input you changed. Keep the original failing example and a separate corrected example rather than overwriting the evidence. Compare the output with the documented contract; an HTTP success code alone does not establish that the correct customer record was changed.</p>
<p>Before sharing, remove authorization headers, cookies, private endpoints and personal data. Keep just the fictional body, method, sanitized path, relevant error and expected behavior. Add a short README explaining the setup and repeat the test from that description. This makes the report useful to another developer without handing over the rest of your workspace.</p>`,
  },
];
