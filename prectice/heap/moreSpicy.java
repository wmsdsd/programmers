// 더 맵게
//
// 문제 설명
//  매운 것을 좋아하는 Leo는 모든 음식의 스코빌 지수를 K 이상으로 만들고 싶습니다. 모든 음식의 스코빌 지수를 K 이상으로 만들기 위해 Leo는 스코빌 지수가 가장 낮은 두 개의 음식을 아래와 같이 특별한 방법으로 섞어 새로운 음식을 만듭니다.
//
//  섞은 음식의 스코빌 지수 = 가장 맵지 않은 음식의 스코빌 지수 + (두 번째로 맵지 않은 음식의 스코빌 지수 * 2)
//  Leo는 모든 음식의 스코빌 지수가 K 이상이 될 때까지 반복하여 섞습니다.
//  Leo가 가진 음식의 스코빌 지수를 담은 배열 scoville과 원하는 스코빌 지수 K가 주어질 때, 모든 음식의 스코빌 지수를 K 이상으로 만들기 위해 섞어야 하는 최소 횟수를 return 하도록 solution 함수를 작성해주세요.
//
// 제한 사항
//  scoville의 길이는 2 이상 1,000,000 이하입니다.
//  K는 0 이상 1,000,000,000 이하입니다.
//  scoville의 원소는 각각 0 이상 1,000,000 이하입니다.
//  모든 음식의 스코빌 지수를 K 이상으로 만들 수 없는 경우에는 -1을 return 합니다.

// 입출력 예
//  scoville	                K	return
//  [1, 2, 3, 9, 10, 12]	    7	2

import java.util.*;

class Solution {
    public int solution(int[] scoville, int K) {
        PriorityQueue<Integer> q = new PriorityQueue<>();

        for(int i = 0; i < scoville.length; i++)
            q.add(scoville[i]);

        int count = 0;
        while(q.size() > 1 && q.peek() < K){
            int weakHot = q.poll();
            int secondWeakHot = q.poll();

            int mixHot = weakHot + (secondWeakHot * 2);
            q.add(mixHot);
            count++;
        }

        if(q.size() <= 1 && q.peek() < K)
            count = -1;

        return count;
    }
}


// import java.util.Arrays;

// class Solution {
//     public int solution(int[] scoville, int K) {
//         int answer = 0;

//         for(int i = 1; i < scoville.length; i++) {

//             // Arrays.sort(scoville);

//             int first = scoville[i-1];
//             int second = scoville[i];

//             if (first < K) {
//                 int mix = first + (second * 2);
//                 scoville[0] = 0;
//                 scoville[1] = mix;
//                 answer++;
//             } else {
//                 return answer;
//             }
//         }

//         if (scoville[1] < K) {
//             return -1;
//         }

//         return answer;
//     }
// }