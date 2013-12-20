rem pscp must be in path
pscp -i ../TreasuryDev.ppk -r app/js ec2-user@10.0.1.171:/opt/checker/app/ 
pscp -i ../TreasuryDev.ppk -r app/css ec2-user@10.0.1.171:/opt/checker/app/ 
pscp -i ../TreasuryDev.ppk -r app/partials ec2-user@10.0.1.171:/opt/checker/app/ 
