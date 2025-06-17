(async function () {
  const MEMBERS_JSON_URL = "https://vuorita.github.io/ring-script/members.json";
  const EXCEPTION_HOSTS = ["taidetta.net"]; // Näitä ei tarkisteta

  // Poista protokolla ja www., normalisoi URL
  function normalizeHost(url) {
    try {
      const u = new URL(url);
      let host = u.hostname.toLowerCase();
      if (host.startsWith("www.")) host = host.slice(4);
      return host;
    } catch (e) {
      return null;
    }
  }

  // Base64-dekoodaus ja UTF-8 muunnos
  function b64DecodeUnicode(str) {
    // atob palauttaa latin1, joten täytyy muuttaa UTF-8 muotoon
    return decodeURIComponent(
      Array.prototype.map
        .call(atob(str), c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
  }

  const currentHost = normalizeHost(window.location.href);

  try {
    const response = await fetch(MEMBERS_JSON_URL);
    const membersEncoded = await response.json();

    // Puretaan nimet ja urlit base64:sta
    const members = membersEncoded.map(m => {
      return {
        name: b64DecodeUnicode(m.name),
        url: b64DecodeUnicode(m.url),
      };
    });

    const allowedHosts = members.map(m => normalizeHost(m.url)).filter(Boolean);
    const isAllowed =
      EXCEPTION_HOSTS.includes(currentHost) || allowedHosts.includes(currentHost);

    const listContainer = document.getElementById("members-list");

    if (!listContainer) return;

    if (isAllowed) {
      let listHtml = "<ul>";
      members.forEach(member => {
        listHtml += `<li><a href="${member.url}" target="_blank" rel="noopener">${member.name}</a></li>`;
      });
      listHtml += "</ul>";
      listContainer.innerHTML = listHtml;
    } else {
      listContainer.innerHTML =
        "<p style='color:red;'>Tämä sivu ei kuulu hyväksyttyihin Taidetta.net-verkoston sivuihin.</p>";
    }
  } catch (e) {
    console.error("Verkkoringin lataus epäonnistui:", e);
    const listContainer = document.getElementById("members-list");
    if (listContainer) {
      listContainer.innerHTML =
        "<p style='color:red;'>Verkkoringin lataus epäonnistui.</p>";
    }
  }
})();

