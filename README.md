# dns-whitelist-worker

Some 3rd party providers have elastic infrastructure which have ephmeral IP addresses so they only public these IP addresses to a DNS record. e.g. [out.adyen.com](https://mxtoolbox.com/SuperTool.aspx?action=a%3aout.adyen.com&run=toolpage)

Cloudflare do not accept IP access or zone lockdown rules in the form of a DNS record whitelist, so a cloudflare worker can help here!

The worker will query the DNS record using 1.1.1.1 DOH and collate a list of IPv4 Addresses that are allowed to continue on through to your web application. Anything not on the list will be rejected. You can also populate an array of fallback IP addresses if you want to populate this with some known IPs. This list will be used if the DNS query fails.

## Prerequisite

- As [Wrangler](https://github.com/cloudflare/wrangler) is the tool of choice for cloudflare workers, we require it to be installed beforehand `npm i @cloudflare/wrangler -g` then run `wrangler config` to login to your cloudflare account.

- Populate your wrangler.toml file using the [example](./wrangler.toml.example)

## Using the worker

- Update the `DNS_RECORD` constant in `./index.js` and add any fallback IP addresses if required.
```node
const DNS_RECORD = 'out.adyen.com'
```

- There is the option to add your own known good IP addresses here as well `safeIPAddresses.push('127.0.0.1')`

- Now you can run `wrangler preview` or `npm run preview` to preview the worker.

- Once you're happy run `wrangler publish` or `npm run publish` to push the worker to your Cloudflare account.


