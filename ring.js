async function fetchMembers() {
  try {
    const response = await fetch('members.json');
    const members = await response.json();

    const container = document.getElementById('members-list');
    container.innerHTML = '';

    members.forEach(member => {
      const a = document.createElement('a');
      a.href = member.url;
      a.target = '_blank';
      a.textContent = member.name;
      a.style.display = 'block';
      container.appendChild(a);
    });

  } catch (error) {
    console.error('Error fetching members list:', error);
  }
}

document.addEventListener('DOMContentLoaded', fetchMembers);
