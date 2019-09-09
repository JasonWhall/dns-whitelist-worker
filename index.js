const handleRequest = async request => {
  const DNS_RECORD = 'out.adyen.com'
  let clientIP = request.headers.get('CF-Connecting-IP')
  let safeIPAddresses = await getIPs(DNS_RECORD)

  // Add your own IP Address here if needed
  //safeIPAddresses.push('127.0.0.1')

  return safeIPAddresses.indexOf(clientIP) > -1
    ? fetch(request)
    : new Response('Sorry, this page is not allowed', {
        status: 403,
        statusText: 'Forbidden'
      })
}

const getIPs = async name => {
  // Fallback IP Addresses in case we cannot query cloudflare DNS.
  const fallBackIPs = [
    '1.1.1.1'
  ]

  const dnsUrl = `https://cloudflare-dns.com/dns-query?name=${name}&type=A`

  return await fetch(dnsUrl, {
    headers: { accept: 'application/dns-json' }
  })
    .then(res => res.json())
    .then(data => data.Answer.map(res => res.data))
    .catch(_err => fallBackIPs)
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
