package array;

import java.util.Scanner;

public class missing_no {

	public static void main(String[] args) 
	{
		Scanner num=new Scanner(System.in);
		
		int n=num.nextInt();
		int a[]=new int[n];
		
		for(int k=0;k<n;k++)
		{
			a[k]=num.nextInt();
		}	
		missing(a,n);
	}
	static int missing(int[] a,int n)
	{
		int i,j;
		int s=a[0];
		for(i=1;i<n;i++)
		{
			if(s!=a[i]-1)
			{
				int p=a[i]-1;
				System.out.println(p);
				return 0;
			}
			else
			{
				s=a[i];
				continue;
			}
		}
		System.out.println("not found");
		return 1;
	}

}
