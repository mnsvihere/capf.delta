const courses = [
    {
        number: 1,
        title: "Climatology 1",
        category: "phygeo",
        videoUrl: "https://us06web.zoom.us/rec/share/D3wZ-OD1mT48uy4n8gXYT8TitM4pXwIbcIrtOWwOgR0BAJfze1JuI5qriKhT88Uo.IP1Qtx8umLfCzmZh?startTime=1763470925000"
    },
     {
        number: 2,
        title: "Climatology 2",
        category: "phygeo",
        videoUrl: "https://us06web.zoom.us/rec/share/D3wZ-OD1mT48uy4n8gXYT8TitM4pXwIbcIrtOWwOgR0BAJfze1JuI5qriKhT88Uo.IP1Qtx8umLfCzmZh?startTime=1763475854000"
    },
   
];

let currentCategory = 'all';

function createCourseCard(course) {
    const card = document.createElement('div');
    card.className = 'course-card';
    card.innerHTML = `
        <div class="course-header">
            <div class="course-category">${course.category}</div>
            <div class="course-number">Class ${course.number}</div>
            <div class="course-title">${course.title}</div>
        </div>
        <div class="course-body">
            <a href="${course.videoUrl}" class="video-link" target="_blank" rel="noopener noreferrer">
                Watch Video ▶
            </a>
        </div>
    `;
    return card;
}

function renderCourses(coursesToRender) {
    const grid = document.getElementById('courseGrid');
    const noResults = document.getElementById('noResults');
    
    grid.innerHTML = '';
    
    if (coursesToRender.length === 0) {
        noResults.style.display = 'block';
        grid.style.display = 'none';
    } else {
        noResults.style.display = 'none';
        grid.style.display = 'grid';
        
        coursesToRender.forEach(course => {
            grid.appendChild(createCourseCard(course));
        });
    }
    
    document.getElementById('visibleClasses').textContent = coursesToRender.length;
}

function filterCourses() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    let filteredCourses = courses;
    
    if (currentCategory !== 'all') {
        filteredCourses = filteredCourses.filter(course => 
            course.category === currentCategory
        );
    }
    
    if (searchTerm) {
        filteredCourses = filteredCourses.filter(course => 
            course.title.toLowerCase().includes(searchTerm) ||
            course.category.toLowerCase().includes(searchTerm) ||
            course.number.toString().includes(searchTerm)
        );
    }
    
    renderCourses(filteredCourses);
}

function handleSearch(event) {
    filterCourses();
}

function handleCategoryClick(event) {
    if (event.target.classList.contains('filter-btn')) {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        event.target.classList.add('active');
        currentCategory = event.target.dataset.category;
        
        filterCourses();
    }
}

function init() {
    document.getElementById('totalClasses').textContent = courses.length;
    renderCourses(courses);
    
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', handleSearch);
    
    const filterContainer = document.querySelector('.filter-container');
    filterContainer.addEventListener('click', handleCategoryClick);
}

document.addEventListener('DOMContentLoaded', init);
