import React from "react";

export default function LogoHomepage({ color }) {
	return (
		<svg
			width="100%"
			height="auto"
			viewBox="0 0 229 87"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g clipPath="url(#clip0_120_2)">
				<path
					d="M37.9449 86.463V87H59.0317V86.463C59.0317 87 61.4039 87 64.3034 87H80.1185C83.0179 87 85.3902 84.6493 85.3902 81.7763V45.2107H94.3521C96.777 45.2107 97.9368 42.2333 96.0917 40.6662L52.0203 1.33203C50.0171 -0.44401 46.9595 -0.44401 44.9563 1.33203L0.884865 40.6662C-0.907512 42.2333 0.199544 45.2107 2.62452 45.2107H11.5864V81.7763C11.5864 84.6493 13.9587 87 16.8581 87H32.6732C35.5726 87 40.4167 87 37.9449 86.463Z"
					fill={color ? color : "white"}
				/>
				<path
					d="M22.713 82.392C21.7657 82.392 21.0307 82.1307 20.508 81.608C20.018 81.0853 19.773 80.334 19.773 79.354V50.199C19.773 49.1863 20.018 48.4187 20.508 47.896C21.0307 47.3407 21.7003 47.063 22.517 47.063C23.2683 47.063 23.8237 47.21 24.183 47.504C24.575 47.7653 25.0323 48.2227 25.555 48.876L44.322 73.229H43.048V50.052C43.048 49.1047 43.293 48.3697 43.783 47.847C44.3057 47.3243 45.0407 47.063 45.988 47.063C46.9353 47.063 47.654 47.3243 48.144 47.847C48.634 48.3697 48.879 49.1047 48.879 50.052V79.452C48.879 80.3667 48.6503 81.0853 48.193 81.608C47.7357 82.1307 47.115 82.392 46.331 82.392C45.5797 82.392 44.9753 82.245 44.518 81.951C44.0933 81.657 43.6197 81.1833 43.097 80.53L24.379 56.177H25.604V79.354C25.604 80.334 25.359 81.0853 24.869 81.608C24.379 82.1307 23.6603 82.392 22.713 82.392ZM63.7283 82.49C61.997 82.49 60.4453 82.1633 59.0733 81.51C57.734 80.824 56.6723 79.9093 55.8883 78.766C55.137 77.6227 54.7613 76.3323 54.7613 74.895C54.7613 73.131 55.2186 71.7427 56.1333 70.73C57.048 69.6847 58.5343 68.9333 60.5923 68.476C62.6503 68.0187 65.4106 67.79 68.8733 67.79H71.3233V71.318H68.9223C66.897 71.318 65.28 71.416 64.0713 71.612C62.8626 71.808 61.997 72.151 61.4743 72.641C60.9843 73.0983 60.7393 73.7517 60.7393 74.601C60.7393 75.679 61.115 76.561 61.8663 77.247C62.6176 77.933 63.663 78.276 65.0023 78.276C66.0803 78.276 67.0276 78.031 67.8443 77.541C68.6936 77.0183 69.3633 76.316 69.8533 75.434C70.3433 74.552 70.5883 73.5393 70.5883 72.396V66.761C70.5883 65.1277 70.229 63.9517 69.5103 63.233C68.7916 62.5143 67.583 62.155 65.8843 62.155C64.937 62.155 63.908 62.2693 62.7973 62.498C61.7193 62.7267 60.576 63.1187 59.3673 63.674C58.7466 63.968 58.1913 64.0497 57.7013 63.919C57.244 63.7883 56.8846 63.527 56.6233 63.135C56.362 62.7103 56.2313 62.253 56.2313 61.763C56.2313 61.273 56.362 60.7993 56.6233 60.342C56.8846 59.852 57.3256 59.4927 57.9463 59.264C59.449 58.6433 60.8863 58.2023 62.2583 57.941C63.663 57.6797 64.937 57.549 66.0803 57.549C68.4323 57.549 70.3596 57.9083 71.8623 58.627C73.3976 59.3457 74.541 60.44 75.2923 61.91C76.0436 63.3473 76.4193 65.2093 76.4193 67.496V79.256C76.4193 80.2687 76.1743 81.0527 75.6843 81.608C75.1943 82.1307 74.492 82.392 73.5773 82.392C72.6626 82.392 71.944 82.1307 71.4213 81.608C70.9313 81.0527 70.6863 80.2687 70.6863 79.256V76.904H71.0783C70.8496 78.0473 70.3923 79.0437 69.7063 79.893C69.053 80.7097 68.22 81.3467 67.2073 81.804C66.1946 82.2613 65.035 82.49 63.7283 82.49Z"
					fill="black"
				/>
				<path
					d="M105.259 82.49C102.744 82.49 100.555 81.9837 98.693 80.971C96.831 79.9257 95.3937 78.4557 94.381 76.561C93.3683 74.6663 92.862 72.445 92.862 69.897C92.862 67.9697 93.1397 66.2547 93.695 64.752C94.283 63.2167 95.116 61.9263 96.194 60.881C97.272 59.803 98.5787 58.9863 100.114 58.431C101.649 57.843 103.364 57.549 105.259 57.549C106.337 57.549 107.497 57.696 108.738 57.99C110.012 58.284 111.204 58.774 112.315 59.46C112.838 59.7867 113.181 60.1787 113.344 60.636C113.507 61.0933 113.54 61.567 113.442 62.057C113.344 62.5143 113.132 62.9227 112.805 63.282C112.511 63.6087 112.135 63.821 111.678 63.919C111.221 63.9843 110.714 63.87 110.159 63.576C109.44 63.1513 108.705 62.841 107.954 62.645C107.203 62.4163 106.484 62.302 105.798 62.302C104.72 62.302 103.773 62.4817 102.956 62.841C102.139 63.1677 101.437 63.6577 100.849 64.311C100.294 64.9317 99.869 65.7157 99.575 66.663C99.281 67.6103 99.134 68.7047 99.134 69.946C99.134 72.3633 99.7057 74.2743 100.849 75.679C102.025 77.051 103.675 77.737 105.798 77.737C106.484 77.737 107.186 77.639 107.905 77.443C108.656 77.247 109.408 76.9367 110.159 76.512C110.714 76.218 111.204 76.12 111.629 76.218C112.086 76.316 112.462 76.5447 112.756 76.904C113.05 77.2307 113.23 77.639 113.295 78.129C113.36 78.5863 113.295 79.0437 113.099 79.501C112.936 79.9583 112.609 80.334 112.119 80.628C111.041 81.2813 109.898 81.755 108.689 82.049C107.48 82.343 106.337 82.49 105.259 82.49ZM128.628 82.49C125.916 82.49 123.581 81.9837 121.621 80.971C119.661 79.9583 118.142 78.521 117.064 76.659C116.018 74.797 115.496 72.592 115.496 70.044C115.496 67.5613 116.002 65.389 117.015 63.527C118.06 61.665 119.481 60.2113 121.278 59.166C123.107 58.088 125.181 57.549 127.501 57.549C129.199 57.549 130.718 57.8267 132.058 58.382C133.43 58.9373 134.589 59.7377 135.537 60.783C136.517 61.8283 137.252 63.1023 137.742 64.605C138.264 66.075 138.526 67.741 138.526 69.603C138.526 70.191 138.313 70.6483 137.889 70.975C137.497 71.269 136.925 71.416 136.174 71.416H120.445V67.888H134.214L133.43 68.623C133.43 67.1203 133.201 65.8627 132.744 64.85C132.319 63.8373 131.682 63.0697 130.833 62.547C130.016 61.9917 128.987 61.714 127.746 61.714C126.374 61.714 125.198 62.0407 124.218 62.694C123.27 63.3147 122.535 64.213 122.013 65.389C121.523 66.5323 121.278 67.9043 121.278 69.505V69.848C121.278 72.5267 121.898 74.5357 123.14 75.875C124.414 77.1817 126.276 77.835 128.726 77.835C129.575 77.835 130.522 77.737 131.568 77.541C132.646 77.3123 133.658 76.9367 134.606 76.414C135.292 76.022 135.896 75.8587 136.419 75.924C136.941 75.9567 137.35 76.1363 137.644 76.463C137.97 76.7897 138.166 77.198 138.232 77.688C138.297 78.1453 138.199 78.619 137.938 79.109C137.709 79.599 137.301 80.0237 136.713 80.383C135.569 81.1017 134.246 81.6407 132.744 82C131.274 82.3267 129.902 82.49 128.628 82.49ZM146.414 82.392C145.434 82.392 144.683 82.1307 144.16 81.608C143.638 81.0527 143.376 80.2687 143.376 79.256V60.734C143.376 59.7213 143.638 58.9537 144.16 58.431C144.683 57.9083 145.418 57.647 146.365 57.647C147.313 57.647 148.048 57.9083 148.57 58.431C149.093 58.9537 149.354 59.7213 149.354 60.734V64.066L148.815 62.841C149.534 61.1097 150.645 59.803 152.147 58.921C153.683 58.0063 155.414 57.549 157.341 57.549C159.269 57.549 160.853 57.9083 162.094 58.627C163.336 59.3457 164.267 60.44 164.887 61.91C165.508 63.3473 165.818 65.1767 165.818 67.398V79.256C165.818 80.2687 165.557 81.0527 165.034 81.608C164.512 82.1307 163.76 82.392 162.78 82.392C161.8 82.392 161.033 82.1307 160.477 81.608C159.955 81.0527 159.693 80.2687 159.693 79.256V67.692C159.693 65.83 159.334 64.4743 158.615 63.625C157.929 62.7757 156.851 62.351 155.381 62.351C153.585 62.351 152.147 62.9227 151.069 64.066C150.024 65.1767 149.501 66.663 149.501 68.525V79.256C149.501 81.3467 148.472 82.392 146.414 82.392ZM154.597 55.736C153.846 55.736 153.176 55.54 152.588 55.148C152.033 54.7233 151.559 54.1517 151.167 53.433L147.639 47.014C147.345 46.4913 147.28 46.0177 147.443 45.593C147.607 45.1683 147.884 44.858 148.276 44.662C148.668 44.4333 149.077 44.3517 149.501 44.417C149.959 44.4823 150.334 44.7437 150.628 45.201L154.597 51.375L158.566 45.201C158.86 44.7437 159.22 44.4823 159.644 44.417C160.102 44.3517 160.526 44.4333 160.918 44.662C161.31 44.858 161.588 45.1683 161.751 45.593C161.915 46.0177 161.849 46.4913 161.555 47.014L158.076 53.433C157.684 54.1517 157.194 54.7233 156.606 55.148C156.018 55.54 155.349 55.736 154.597 55.736ZM196.318 82.49C194.195 82.49 192.415 82.1307 190.977 81.412C189.573 80.6933 188.527 79.648 187.841 78.276C187.155 76.8713 186.812 75.14 186.812 73.082V62.645H184.264C183.48 62.645 182.876 62.449 182.451 62.057C182.027 61.6323 181.814 61.0607 181.814 60.342C181.814 59.5907 182.027 59.019 182.451 58.627C182.876 58.235 183.48 58.039 184.264 58.039H186.812V53.58C186.812 52.5673 187.074 51.7997 187.596 51.277C188.152 50.7543 188.919 50.493 189.899 50.493C190.879 50.493 191.631 50.7543 192.153 51.277C192.676 51.7997 192.937 52.5673 192.937 53.58V58.039H198.131C198.915 58.039 199.52 58.235 199.944 58.627C200.369 59.019 200.581 59.5907 200.581 60.342C200.581 61.0607 200.369 61.6323 199.944 62.057C199.52 62.449 198.915 62.645 198.131 62.645H192.937V72.739C192.937 74.307 193.28 75.483 193.966 76.267C194.652 77.051 195.763 77.443 197.298 77.443C197.854 77.443 198.344 77.394 198.768 77.296C199.193 77.198 199.569 77.1327 199.895 77.1C200.287 77.0673 200.614 77.198 200.875 77.492C201.137 77.7533 201.267 78.3087 201.267 79.158C201.267 79.8113 201.153 80.3993 200.924 80.922C200.728 81.412 200.353 81.755 199.797 81.951C199.373 82.0817 198.817 82.196 198.131 82.294C197.445 82.4247 196.841 82.49 196.318 82.49ZM214.836 82.49C212.353 82.49 210.197 81.9837 208.368 80.971C206.538 79.9583 205.117 78.521 204.105 76.659C203.092 74.7643 202.586 72.543 202.586 69.995C202.586 68.0677 202.863 66.3527 203.419 64.85C204.007 63.3147 204.84 62.008 205.918 60.93C206.996 59.8193 208.286 58.9863 209.789 58.431C211.291 57.843 212.974 57.549 214.836 57.549C217.318 57.549 219.474 58.0553 221.304 59.068C223.133 60.0807 224.554 61.518 225.567 63.38C226.579 65.242 227.086 67.447 227.086 69.995C227.086 71.9223 226.792 73.6537 226.204 75.189C225.648 76.7243 224.832 78.0473 223.754 79.158C222.676 80.236 221.385 81.069 219.883 81.657C218.38 82.2123 216.698 82.49 214.836 82.49ZM214.836 77.835C216.044 77.835 217.106 77.541 218.021 76.953C218.935 76.365 219.638 75.4993 220.128 74.356C220.65 73.18 220.912 71.7263 220.912 69.995C220.912 67.3817 220.356 65.438 219.246 64.164C218.135 62.8573 216.665 62.204 214.836 62.204C213.627 62.204 212.565 62.498 211.651 63.086C210.736 63.6413 210.017 64.507 209.495 65.683C209.005 66.8263 208.76 68.2637 208.76 69.995C208.76 72.5757 209.315 74.5357 210.426 75.875C211.536 77.1817 213.006 77.835 214.836 77.835Z"
					fill="white"
				/>
			</g>
			<defs>
				<clipPath id="clip0_120_2">
					<rect width="229" height="87" fill="white" />
				</clipPath>
			</defs>
		</svg>
	);
}