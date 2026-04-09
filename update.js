const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Replace CSS
html = html.replace(/\/\* Animated Background Dot Waves \*\/[\s\S]*?(?=<\/style>)/, `/* Animated Background Particle Burst */
        .particle-container {
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            overflow: hidden;
            z-index: 1;
            pointer-events: none;
        }

        .particle {
            position: absolute;
            width: 6px;
            height: 6px;
            border-radius: 5px;
            opacity: 0;
            transform: translate(-50%, -50%);
            animation: floatParticle ease-in infinite;
        }

        @keyframes floatParticle {
            0% {
                transform: translate(-50%, -50%) translate(0, 0) scale(0.5);
                opacity: 0;
            }
            20% {
                opacity: 0.8;
                transform: translate(-50%, -50%) translate(calc(var(--tx) * 0.2), calc(var(--ty) * 0.2)) scale(1);
            }
            80% {
                opacity: 0.8;
                transform: translate(-50%, -50%) translate(calc(var(--tx) * 0.8), calc(var(--ty) * 0.8)) scale(1);
            }
            100% {
                transform: translate(-50%, -50%) translate(var(--tx), var(--ty)) scale(0.5);
                opacity: 0;
            }
        }
        
        .login-wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            background: #FFFFFF;
            padding: 1rem;
            position: relative;
            overflow: hidden;
            flex-direction: column;
        }

        .login-header-nav {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            padding: 1.5rem 3rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            z-index: 20;
        }

        .login-header-logo {
            font-size: 1.5rem;
            font-weight: 600;
            color: #4c1d95;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .login-header-links {
            display: flex;
            gap: 2rem;
            color: #7c3aed;
            font-weight: 500;
        }

        .login-header-links a {
            color: inherit;
            text-decoration: none;
            font-size: 0.95rem;
        }

        .login-header-links a:hover {
            color: #111827;
        }

        .login-heading {
            z-index: 10;
            text-align: center;
            max-width: 900px;
            margin-bottom: 2.5rem;
            margin-top: 4rem;
        }

        .login-heading h1 {
            font-size: 5rem;
            font-weight: 400;
            color: #4c1d95;
            line-height: 1.1;
            letter-spacing: -0.04em;
        }

        .login-card {
            background: #FFFFFF;
            border-radius: 20px;
            padding: 2.5rem;
            width: 100%;
            max-width: 420px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
            border: 1px solid #F3F4F6;
            text-align: center;
            position: relative;
            z-index: 10;
        }

        .login-card label {
            text-align: left;
        }

        .login-card h2 {
            margin-bottom: 0.5rem;
            color: var(--text-main);
            font-weight: 600;
            font-size: 1.5rem;
        }

        .login-card p {
            color: var(--text-muted);
            margin-bottom: 2rem;
            font-size: 0.95rem;
        }

        .login-btn-group {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 3rem;
            z-index: 10;
            position: relative;
        }

        .login-btn-dark {
            background: #5b21b6;
            color: #ddd6fe;
            padding: 0.875rem 1.5rem;
            border-radius: 9999px;
            font-weight: 500;
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .login-btn-light {
            background: #F9FAFB;
            color: #111827;
            padding: 0.875rem 1.5rem;
            border-radius: 9999px;
            font-weight: 500;
            text-decoration: none;
            border: 1px solid #E5E7EB;
        }
        
        @media (max-width: 768px) {
            .login-heading h1 {
                font-size: 3rem;
            }
            .login-header-links {
               display: none;
            }
        }
    `);

// Also remove old login layout CSS to avoid double parsing mismatch
html = html.replace(/\/\* Login Layout \*\/[\s\S]*?(?=\/\* Grid Layouts \*\/)/, '/* Grid layout next */\n');

html = html.replace(/<!-- LOGIN VIEW -->[\s\S]*?(?=<!-- APP CONTENT \(HIDDEN INITIALLY\) -->)/, `<!-- LOGIN VIEW -->
    <div id="login-view" class="view-section active login-wrapper">
        
        <div class="login-header-nav">
            <div class="login-header-logo">
                <i class="fas fa-graduation-cap" style="color: var(--primary);"></i> PlacePro
            </div>
            <div class="login-header-links">
                <a href="#">Product</a>
                <a href="#">Use Cases</a>
                <a href="#">Pricing</a>
                <a href="#">Resources</a>
            </div>
            <a href="#" class="login-btn-dark"><i class="fas fa-download"></i> Download App</a>
        </div>

        <div class="particle-container" id="particle-container"></div>

        <div class="login-heading">
            <h1>Experience liftoff with the next-generation assistant</h1>
        </div>

        <div class="login-btn-group">
            <a href="#" class="login-btn-dark"><i class="fas fa-windows"></i> Download for Windows</a>
            <a href="#" class="login-btn-light">Explore use cases</a>
        </div>

        <div class="login-card">
            <h2>Welcome Back</h2>
            <p>Sign in to PlacePro to continue building your career.</p>

            <form onsubmit="handleLogin(event)">
                <div class="form-group">
                    <label>Role</label>
                    <select id="loginRole" required style="border-radius: 12px; background: #F9FAFB;">
                        <option value="student">Student</option>
                        <option value="officer">Placement Officer</option>
                        <option value="company">Company</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Email Address</label>
                    <input type="email" placeholder="you@example.com" required style="border-radius: 12px; background: #F9FAFB;">
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input type="password" placeholder="••••••••" required style="border-radius: 12px; background: #F9FAFB;">
                </div>

                <button type="submit" class="btn" style="border-radius: 12px; background: #111827; transition: background 0.3s ease;">Sign In</button>
            </form>
        </div>
    </div>\n\n    `);

// Inject script
if (!html.includes('createParticles')) {
    html = html.replace(/<script>/, \`<script>
        // Particle Animation
        function createParticles() {
            const container = document.getElementById('particle-container');
            if(!container) return;
            const particleCount = 250;
            const colors = ['#3B82F6', '#6366F1', '#8B5CF6', '#EC4899', '#10B981', '#F43F5E'];
            
            for(let i=0; i<particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                
                const angle = Math.random() * Math.PI * 2;
                const distance = 150 + Math.random() * 800; // spread out
                
                const tx = Math.cos(angle) * distance;
                const ty = Math.sin(angle) * distance;
                
                particle.style.setProperty('--tx', \\\`\\\${tx}px\\\`);
                particle.style.setProperty('--ty', \\\`\\\${ty}px\\\`);
                
                particle.style.left = '50%';
                /* shift up slightly */
                particle.style.top = '40%';
                
                particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                
                particle.style.animationDelay = \\\`\\\${Math.random() * 5}s\\\`;
                particle.style.animationDuration = \\\`\\\${4 + Math.random() * 8}s\\\`;
                particle.style.width = \\\`\\\${3 + Math.random() * 5}px\\\`;
                particle.style.height = particle.style.width;
                
                container.appendChild(particle);
            }
        }
        document.addEventListener('DOMContentLoaded', createParticles);
        \`);
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Update complete.');
